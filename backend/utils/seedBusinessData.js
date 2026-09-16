const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const PaymentMethod = require('../models/PaymentMethod');

/**
 * Crea los datos base del negocio si la base está vacía:
 * - El kit odontológico principal (Product)
 * - El proveedor único (Supplier)
 * - Los métodos de pago aceptados (PaymentMethod)
 * Se ejecuta automáticamente al iniciar el servidor. Es idempotente:
 * si ya existen datos, no hace nada.
 */
const seedBusinessData = async () => {
  try {
    // Proveedor único
    let supplier = await Supplier.findOne();
    if (!supplier) {
      supplier = await Supplier.create({
        company: 'BioTex Médica S.A.',
        subtitle: 'Fabricante y Envasador Estéril Exclusivo',
        contactName: 'Lic. Martín Rodriguez',
        role: 'Gerente Comercial de Cuentas Quirúrgicas',
        phone: '+54 9 11 5522-8400',
        whatsapp: '5491155228400',
        email: 'pedidos@biotexmedica.com.ar',
        address: 'Parque Industrial Tortuguitas, Buenos Aires (Despachos semanales a Tucumán)',
        cuit: '30-71458920-4',
        taxCondition: 'Responsable Inscripto (Factura A)',
        bank: 'Banco Santander Río',
        cbu: '0720123488000034567890',
        alias: 'BIOTEX.PAGOS.OFICIAL',
        anmatPm: 'PM N° 1450-88 (Esterilidad ETO ANMAT)',
        costPerKit: 5000,
        regularSalePrice: 8500,
        paymentTerms: '50% anticipo al emitir pedido • 50% contra entrega en depósito Tucumán',
        deliveryTime: '48 a 72 hs hábiles post-pago',
        itemsBreakdown: [
          { name: 'Batas Quirúrgicas con Puños Elastizados', qty: '2 unidades', cost: 1600 },
          { name: 'Compresa 1x1 mt Impermeable', qty: '1 unidad', cost: 700 },
          { name: 'Compresa 50x50 cm Impermeable', qty: '1 unidad', cost: 400 },
          { name: 'Campo Fenestrado para Paciente', qty: '1 unidad', cost: 500 },
          { name: 'Cubre Suctores Descartables', qty: '2 unidades', cost: 400 },
          { name: 'Gorros Clásicos con Elástico', qty: '2 unidades', cost: 400 },
          { name: 'Barbijos Triple Capa con Filtro', qty: '2 unidades', cost: 450 },
          { name: 'Cubrecalzados Elastizados', qty: '2 unidades', cost: 350 },
          { name: 'Termosellado y Esterilización ETO ANMAT', qty: '1 empaque cerrado', cost: 200 },
        ],
        tierPricing: [
          { tier: 'Lote Menor (1 a 49 kits)', costPerKit: 5200, unitMargin: 3300, marginPct: '38.8%' },
          { tier: 'Lote Habitual (50 a 99 kits)', costPerKit: 5000, unitMargin: 3500, marginPct: '41.2%' },
          { tier: 'Lote Mayorista (100 a 199 kits)', costPerKit: 4700, unitMargin: 3800, marginPct: '44.7%' },
          { tier: 'Lote Escala (200+ kits)', costPerKit: 4400, unitMargin: 4100, marginPct: '48.2%' },
        ],
      });
      console.log('✅ Proveedor base creado:', supplier.company);
    }

    // Kit principal
    let kit = await Product.findOne({ category: 'Kits Quirúrgicos' });
    if (!kit) {
      kit = await Product.create({
        name: 'Kit Odontológico Completo',
        sku: 'GM-KIT-001',
        description: 'Kit esterilizado y descartable de bioseguridad para cirugía odontológica. Incluye batas, compresas, campo fenestrado, cubre suctores, gorros, barbijos y cubrecalzados.',
        price: 8500,
        cost: 5000,
        stock: 0,
        minStock: 30,
        category: 'Kits Quirúrgicos',
        supplier: supplier._id,
        components: [
          { name: 'Batas Quirúrgicas con Puños', qty: 2, costPer: 800 },
          { name: 'Compresas Impermeables 1x1 mt', qty: 1, costPer: 700 },
          { name: 'Compresas Impermeables 50x50 cm', qty: 1, costPer: 400 },
          { name: 'Campos Fenestrados para Paciente', qty: 1, costPer: 500 },
          { name: 'Cubre Suctores Descartables', qty: 2, costPer: 200 },
          { name: 'Gorros Clásicos con Elástico', qty: 2, costPer: 200 },
          { name: 'Barbijos Triple Capa Bacteriana', qty: 2, costPer: 225 },
          { name: 'Cubrecalzados Elastizados', qty: 2, costPer: 175 },
        ],
      });
      console.log('✅ Kit principal creado:', kit.name);
    }

    // Métodos de pago
    const methodCount = await PaymentMethod.countDocuments();
    if (methodCount === 0) {
      await PaymentMethod.insertMany([
        { key: 'transferencia', name: 'Transferencia Bancaria', color: '#0F172A', secondaryColor: '#1E293B', description: 'Transferencia inmediata con alias o CBU' },
        { key: 'efectivo', name: 'Efectivo / Contra Entrega (Tucumán)', color: '#10B981', secondaryColor: '#059669', description: 'Abonado al momento de recibir el kit en clínica' },
        { key: 'mercadopago', name: 'Mercado Pago / Tarjetas', color: '#00C2CB', secondaryColor: '#0284C7', description: 'Link de pago digital y cuotas' },
      ]);
      console.log('✅ Métodos de pago base creados.');
    }
  } catch (error) {
    console.error('❌ Error creando datos base del negocio:', error.message);
  }
};

module.exports = seedBusinessData;
