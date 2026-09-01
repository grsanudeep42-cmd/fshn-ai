'use client';

import React, { useState, useMemo } from 'react';
import {
  Box, Text, Group, Stack, Button, Table, Badge, ActionIcon,
  TextInput, Select, Modal, NumberInput, Textarea, SimpleGrid,
  Tabs, Alert,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { MOCK_GARMENTS, MOCK_SHOPS } from '@/lib/mock-data';
import { CATEGORY_LABELS, CATEGORY_ICONS, formatINR, formatDate } from '@/lib/utils';
import type { GarmentCategory, GarmentItem } from '@/types/dashboard';

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'saree', label: 'Saree' },
  { value: 'dress', label: 'Dress / Lehenga' },
  { value: 'top', label: 'Top / Kurti' },
  { value: 'bottom', label: 'Bottom / Palazzo' },
  { value: 'children', label: 'Children' },
  { value: 'other', label: 'Other' },
];

const CATEGORY_CREDIT_TYPE: Record<GarmentCategory, 'normal' | 'premium'> = {
  saree: 'premium',
  dress: 'normal',
  top: 'normal',
  bottom: 'normal',
  children: 'normal',
  other: 'normal',
};

export default function InventoryPage() {
  const shop = MOCK_SHOPS[0];
  const [garments, setGarments] = useState<GarmentItem[]>(
    MOCK_GARMENTS.filter(g => g.shopId === shop.id)
  );
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('catalog');

  // Add garment form state
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState<GarmentCategory>('saree');
  const [newPrice, setNewPrice] = useState<number | string>(0);
  const [newStock, setNewStock] = useState<number | string>(1);
  const [newDesc, setNewDesc] = useState('');

  const filtered = useMemo(() => {
    return garments.filter(g => {
      const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'all' || g.category === categoryFilter;
      const matchStatus = statusFilter === 'all'
        ? true
        : statusFilter === 'active'
          ? g.isActive && g.stockCount > 0
          : !g.isActive || g.stockCount === 0;
      return matchSearch && matchCat && matchStatus;
    });
  }, [garments, search, categoryFilter, statusFilter]);

  const totalSkus = garments.length;
  const activeSkus = garments.filter(g => g.isActive && g.stockCount > 0).length;
  const lowStockSkus = garments.filter(g => g.stockCount > 0 && g.stockCount < 5).length;
  const outOfStockSkus = garments.filter(g => g.stockCount === 0).length;
  const totalTryOns = garments.reduce((sum, g) => sum + g.tryOnCount, 0);

  function handleAddGarment() {
    if (!newName || !newSku) {
      notifications.show({ message: 'Name and SKU are required', color: 'red' });
      return;
    }
    const newItem: GarmentItem = {
      id: `g-new-${Date.now()}`,
      shopId: shop.id,
      sku: newSku,
      name: newName,
      category: newCategory,
      price: Number(newPrice),
      stockCount: Number(newStock),
      description: newDesc,
      isActive: true,
      tryOnCount: 0,
      addedAt: new Date().toISOString(),
    };
    setGarments(prev => [newItem, ...prev]);
    setAddOpen(false);
    setNewName(''); setNewSku(''); setNewPrice(0); setNewStock(1); setNewDesc('');
    notifications.show({
      message: `${newItem.name} added to inventory`,
      color: 'green',
      icon: <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>,
    });
  }

  function handleToggleActive(id: string) {
    setGarments(prev => prev.map(g =>
      g.id === id ? { ...g, isActive: !g.isActive } : g
    ));
  }

  function handleDownloadCSV() {
    const header = 'SKU,Name,Category,Price (₹),Stock Count,Description,Active';
    const rows = garments.map(g =>
      `"${g.sku}","${g.name}","${g.category}","${g.price}","${g.stockCount}","${g.description ?? ''}","${g.isActive}"`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${shop.slug}-inventory.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Stack gap={24}>
      {/* Page header */}
      <Group justify="space-between" align="flex-start" wrap="wrap" gap={12}>
        <Box>
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 24, fontWeight: 400, color: '#1A1A1A' }}>
            Inventory Management
          </Text>
          <Text style={{ fontSize: 13, color: '#9A8E7C', marginTop: 2 }}>
            {shop.inventorySource === 'vton'
              ? 'Managed by VTON — add, edit and track your garment catalog'
              : 'Connected to your existing inventory system'}
          </Text>
        </Box>
        <Group gap={10}>
          <Button
            variant="outline"
            color="dark"
            size="sm"
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>}
            styles={{ root: { borderColor: '#E8E0D6', fontSize: 12 } }}
            onClick={handleDownloadCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="outline"
            color="dark"
            size="sm"
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>upload</span>}
            styles={{ root: { borderColor: '#E8E0D6', fontSize: 12 } }}
          >
            Import CSV
          </Button>
          <Button
            color="dark"
            size="sm"
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>}
            onClick={() => setAddOpen(true)}
          >
            Add Garment
          </Button>
        </Group>
      </Group>

      {/* Inventory source info banner */}
      {shop.inventorySource === 'own' && (
        <Alert
          icon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>link</span>}
          color="blue"
          radius="sm"
          styles={{ root: { borderColor: 'rgba(21,101,192,0.3)', background: 'rgba(21,101,192,0.06)' } }}
        >
          <Text style={{ fontSize: 12, color: '#1565C0', fontWeight: 500 }}>
            Your inventory is synced from your existing system. Changes made here will not overwrite your source data. Contact us to enable two-way sync.
          </Text>
        </Alert>
      )}

      {/* Stats row */}
      <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={{ base: 10, md: 12 }}>
        {[
          { label: 'Total SKUs', value: totalSkus, icon: 'inventory_2', color: '#C9A84C' },
          { label: 'Active Items', value: activeSkus, icon: 'check_circle', color: '#2E7D32' },
          { label: 'Low Stock', value: lowStockSkus, icon: 'warning', color: '#E65100' },
          { label: 'Out of Stock', value: outOfStockSkus, icon: 'remove_shopping_cart', color: '#9A8E7C' },
          { label: 'Total Try-Ons', value: totalTryOns, icon: 'auto_awesome', color: '#4A90A4' },
        ].map(stat => (
          <Box
            key={stat.label}
            className="kpi-card"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8E0D6',
              borderRadius: 8,
              padding: '14px 16px',
            }}
          >
            <Group gap={8} mb={6}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16, color: stat.color, fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
              <Text style={{ fontSize: 10, fontWeight: 600, color: '#9A8E7C', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                {stat.label}
              </Text>
            </Group>
            <Text style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', fontFamily: 'monospace' }}>
              {stat.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Filters */}
      <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, padding: 16 }}>
          <Group gap={12} wrap="wrap">
          <TextInput
            placeholder="Search by name or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="sm"
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>search</span>}
            styles={{ input: { borderColor: '#E8E0D6', fontSize: 13 } }}
            style={{ flex: 1, minWidth: 160 }}
          />
          <Select
            value={categoryFilter}
            onChange={v => setCategoryFilter(v ?? 'all')}
            data={CATEGORIES}
            size="sm"
            placeholder="Category"
            styles={{ input: { borderColor: '#E8E0D6', fontSize: 13 } }}
            style={{ minWidth: 140 }}
          />
          <Select
            value={statusFilter}
            onChange={v => setStatusFilter(v ?? 'all')}
            data={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'In Stock' },
              { value: 'inactive', label: 'Out of Stock / Inactive' },
            ]}
            size="sm"
            styles={{ input: { borderColor: '#E8E0D6', fontSize: 13 } }}
            style={{ minWidth: 140 }}
          />
          <Text style={{ fontSize: 12, color: '#9A8E7C', alignSelf: 'center' }}>
            {filtered.length} of {totalSkus} items
          </Text>
          </Group>
      </Box>

      {/* Garment Table */}
      <Box style={{ background: '#FFFFFF', border: '1px solid #E8E0D6', borderRadius: 8, overflow: 'hidden' }}>
        <Box className="dash-table-container" style={{ overflowX: 'auto' }}>
          <Table className="dash-table" highlightOnHover striped={false}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ minWidth: 60 }}>Credit</Table.Th>
                <Table.Th style={{ minWidth: 80 }}>SKU</Table.Th>
                <Table.Th style={{ minWidth: 200 }}>Name</Table.Th>
                <Table.Th style={{ minWidth: 120 }}>Category</Table.Th>
                <Table.Th style={{ minWidth: 100, textAlign: 'right' }}>Price</Table.Th>
                <Table.Th style={{ minWidth: 90, textAlign: 'center' }}>Stock</Table.Th>
                <Table.Th style={{ minWidth: 90, textAlign: 'center' }}>Try-Ons</Table.Th>
                <Table.Th style={{ minWidth: 80, textAlign: 'center' }}>Status</Table.Th>
                <Table.Th style={{ minWidth: 80 }}>Added</Table.Th>
                <Table.Th style={{ minWidth: 60 }} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filtered.map(garment => {
                const creditType = CATEGORY_CREDIT_TYPE[garment.category];
                const isOutOfStock = garment.stockCount === 0;
                const isLowStock = garment.stockCount > 0 && garment.stockCount < 5;

                return (
                  <Table.Tr key={garment.id} style={{ opacity: !garment.isActive ? 0.5 : 1 }}>
                    <Table.Td>
                      <Box
                        style={{
                          display: 'inline-flex',
                          padding: '2px 7px',
                          borderRadius: 3,
                          background: creditType === 'premium'
                            ? 'rgba(201,168,76,0.10)'
                            : 'rgba(74,144,164,0.10)',
                          border: `1px solid ${creditType === 'premium' ? 'rgba(201,168,76,0.30)' : 'rgba(74,144,164,0.30)'}`,
                        }}
                      >
                        <Text style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: creditType === 'premium' ? '#C9A84C' : '#4A90A4',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>
                          {creditType}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ fontSize: 11, fontFamily: 'monospace', color: '#6B6560' }}>
                        {garment.sku}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Box>
                        <Text style={{ fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>
                          {garment.name}
                        </Text>
                        {garment.description && (
                          <Text style={{ fontSize: 10, color: '#9A8E7C', marginTop: 1 }}>
                            {garment.description}
                          </Text>
                        )}
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={5}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#9A8E7C' }}>
                          {CATEGORY_ICONS[garment.category]}
                        </span>
                        <Text style={{ fontSize: 12, color: '#6B6560' }}>
                          {CATEGORY_LABELS[garment.category]}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', fontFamily: 'monospace' }}>
                        {formatINR(garment.price)}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Box
                        style={{
                          display: 'inline-flex',
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: isOutOfStock
                            ? 'rgba(107,101,96,0.10)'
                            : isLowStock
                              ? 'rgba(230,81,0,0.10)'
                              : 'rgba(46,125,50,0.08)',
                        }}
                      >
                        <Text style={{
                          fontSize: 12,
                          fontWeight: 700,
                          fontFamily: 'monospace',
                          color: isOutOfStock ? '#9A8E7C' : isLowStock ? '#E65100' : '#2E7D32',
                        }}>
                          {isOutOfStock ? '—' : garment.stockCount}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: 600, color: '#C9A84C', fontFamily: 'monospace' }}>
                        {garment.tryOnCount}
                      </Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Box style={{ display: 'inline-flex', padding: '2px 7px', borderRadius: 4,
                        background: garment.isActive && !isOutOfStock ? 'rgba(46,125,50,0.08)' : 'rgba(107,101,96,0.08)',
                      }}>
                        <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: garment.isActive && !isOutOfStock ? '#2E7D32' : '#9A8E7C',
                        }}>
                          {isOutOfStock ? 'Out of Stock' : garment.isActive ? 'Active' : 'Inactive'}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ fontSize: 11, color: '#9A8E7C' }}>
                        {formatDate(garment.addedAt)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="sm"
                        onClick={() => handleToggleActive(garment.id)}
                        title={garment.isActive ? 'Deactivate' : 'Activate'}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9A8E7C' }}>
                          {garment.isActive ? 'toggle_on' : 'toggle_off'}
                        </span>
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Box>
        {filtered.length === 0 && (
          <Box style={{ padding: 40, textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#D4C9B8', display: 'block', marginBottom: 12 }}>search_off</span>
            <Text style={{ fontSize: 14, color: '#9A8E7C' }}>No garments match your filters</Text>
          </Box>
        )}
      </Box>

      {/* Add Garment Modal */}
      <Modal
        opened={addOpen}
        onClose={() => setAddOpen(false)}
        title={
          <Text style={{ fontFamily: 'var(--font-bodoni), Bodoni Moda, serif', fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}>
            Add New Garment
          </Text>
        }
        size="md"
        radius="sm"
        centered
        styles={{
          header: { borderBottom: '1px solid #E8E0D6', paddingBottom: 12 },
          body: { paddingTop: 20 },
        }}
      >
        <Stack gap={14}>
          <TextInput
            label="Garment Name"
            placeholder="Kanjivaram Silk Saree — Crimson Gold"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            required
            styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
          />
          <TextInput
            label="SKU"
            placeholder="SAR-KNJ-001"
            value={newSku}
            onChange={e => setNewSku(e.target.value)}
            required
            styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
          />
          <Select
            label="Category"
            value={newCategory}
            onChange={v => setNewCategory((v as GarmentCategory) ?? 'saree')}
            data={CATEGORIES.slice(1)}
            styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
          />
          <Box
            style={{
              padding: '8px 12px',
              background: newCategory === 'saree' ? 'rgba(201,168,76,0.08)' : 'rgba(74,144,164,0.08)',
              border: `1px solid ${newCategory === 'saree' ? 'rgba(201,168,76,0.25)' : 'rgba(74,144,164,0.25)'}`,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontSize: 11, color: newCategory === 'saree' ? '#9E7E1E' : '#4A90A4' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 13, verticalAlign: 'middle', marginRight: 4 }}>info</span>
              This category uses <strong>{newCategory === 'saree' ? 'Premium' : 'Normal'}</strong> credits
              ({newCategory === 'saree' ? '1 Premium = ₹8–11' : '1 Normal = ₹4–6'})
            </Text>
          </Box>
          <SimpleGrid cols={2} spacing={12}>
            <NumberInput
              label="Price (₹)"
              value={newPrice}
              onChange={setNewPrice}
              min={0}
              styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
            />
            <NumberInput
              label="Stock Count"
              value={newStock}
              onChange={setNewStock}
              min={0}
              styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
            />
          </SimpleGrid>
          <Textarea
            label="Description (optional)"
            placeholder="Pure silk, 6-yard, zari border"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            autosize
            minRows={2}
            styles={{ label: { fontSize: 12, fontWeight: 600, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.08em' } }}
          />
          <Group justify="flex-end" gap={10} mt={8}>
            <Button variant="subtle" color="gray" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button color="dark" onClick={handleAddGarment}>Add to Inventory</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
