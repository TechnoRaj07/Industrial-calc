import { CalculatorDef } from '@/types';

export const CALCULATORS: CalculatorDef[] = [
  // 1. Percentage
  {
    id: 'percentage',
    slug: 'percentage',
    title: 'Percentage Calculator',
    category: 'General Chemistry',
    description: 'Calculate part, total, or percentage fraction for chemical and process streams.',
    formula: '\\text{Percentage} = \\left( \\frac{\\text{Part}}{\\text{Total}} \\right) \\times 100',
    longExplanation: 'Percentage calculation is fundamental in process chemistry for determining component mass fractions, formulation ratios, and purity metrics.',
    useCases: ['Raw material purity assessment', 'Batch component validation', 'Quality control variance analysis'],
    faqs: [
      { question: 'What units can I use for part and total?', answer: 'As long as both Part and Total are in the same units (e.g., kg, g, L), the resulting percentage is dimensionless.' },
    ],
    inputs: [
      { name: 'part', label: 'Part Mass / Volume', unit: 'kg', defaultValue: 15, type: 'number', min: 0 },
      { name: 'total', label: 'Total Mass / Volume', unit: 'kg', defaultValue: 100, type: 'number', min: 0.0001 },
    ],
    calculate: (inputs) => {
      const part = Number(inputs.part) || 0;
      const total = Number(inputs.total) || 1;
      const percentage = (part / total) * 100;
      return {
        results: [
          { label: 'Percentage Ratio', value: percentage.toFixed(2), unit: '%', highlight: true },
          { label: 'Fractional Ratio', value: (part / total).toFixed(4) },
          { label: 'Remaining Component', value: (100 - percentage).toFixed(2), unit: '%' },
        ],
        chartData: [
          { name: 'Part', value: Number(part.toFixed(2)), unit: 'kg' },
          { name: 'Remainder', value: Number((total - part).toFixed(2)), unit: 'kg' },
        ],
      };
    },
  },

  // 2. Ratio
  {
    id: 'ratio',
    slug: 'ratio',
    title: 'Multi-Component Ratio Calculator',
    category: 'General Chemistry',
    description: 'Determine component proportions and ingredient quantities from a total target batch size.',
    formula: 'A_{qty} = \\text{Total Batch} \\times \\left( \\frac{A}{A + B + C} \\right)',
    longExplanation: 'Proportional mixing ratios enable exact ingredient scaling across pilot plant and commercial production runs.',
    useCases: ['Recipe scaling', 'Buffer formulation', 'Blend optimization'],
    faqs: [
      { question: 'Can I add a third component?', answer: 'Yes, setting Component C to 0 automatically scales a 2-part ratio.' },
    ],
    inputs: [
      { name: 'totalBatch', label: 'Target Total Batch Weight', unit: 'kg', defaultValue: 500, type: 'number', min: 1 },
      { name: 'partA', label: 'Ratio Part A', defaultValue: 3, type: 'number', min: 0 },
      { name: 'partB', label: 'Ratio Part B', defaultValue: 2, type: 'number', min: 0 },
      { name: 'partC', label: 'Ratio Part C (Optional)', defaultValue: 1, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const totalBatch = Number(inputs.totalBatch) || 1;
      const a = Number(inputs.partA) || 0;
      const b = Number(inputs.partB) || 0;
      const c = Number(inputs.partC) || 0;
      const sum = a + b + c || 1;
      const qtyA = (a / sum) * totalBatch;
      const qtyB = (b / sum) * totalBatch;
      const qtyC = (c / sum) * totalBatch;
      return {
        results: [
          { label: 'Quantity Part A', value: qtyA.toFixed(2), unit: 'kg', highlight: true },
          { label: 'Quantity Part B', value: qtyB.toFixed(2), unit: 'kg' },
          { label: 'Quantity Part C', value: qtyC.toFixed(2), unit: 'kg' },
        ],
        chartData: [
          { name: 'Part A', value: Number(qtyA.toFixed(2)), unit: 'kg' },
          { name: 'Part B', value: Number(qtyB.toFixed(2)), unit: 'kg' },
          { name: 'Part C', value: Number(qtyC.toFixed(2)), unit: 'kg' },
        ],
      };
    },
  },

  // 3. Batch Size
  {
    id: 'batch-size',
    slug: 'batch-size',
    title: 'Batch Size Scaling Calculator',
    category: 'Industrial Processes',
    description: 'Scale active ingredient doses and filler masses from standard laboratory batch sizes.',
    formula: '\\text{Scale Factor} = \\frac{\\text{Target Scale Batch}}{\\text{Base Lab Batch}}',
    longExplanation: 'Industrial scaling factors maintain exact stoichiometry and concentration during plant technology transfer.',
    useCases: ['Scale-up from R&D to manufacturing', 'Tank filling calculations'],
    faqs: [
      { question: 'How is scale factor calculated?', answer: 'It is the ratio of target commercial volume over base lab scale volume.' },
    ],
    inputs: [
      { name: 'baseBatch', label: 'Base Lab Batch Volume', unit: 'L', defaultValue: 5, type: 'number', min: 0.1 },
      { name: 'targetBatch', label: 'Target Commercial Batch Volume', unit: 'L', defaultValue: 2500, type: 'number', min: 1 },
      { name: 'baseIngredientMass', label: 'Base Ingredient Weight', unit: 'g', defaultValue: 125, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const base = Number(inputs.baseBatch) || 1;
      const target = Number(inputs.targetBatch) || 1;
      const baseIng = Number(inputs.baseIngredientMass) || 0;
      const factor = target / base;
      const targetIngKg = (baseIng * factor) / 1000;
      return {
        results: [
          { label: 'Scale Factor', value: factor.toFixed(2), unit: 'x', highlight: true },
          { label: 'Target Ingredient Required', value: targetIngKg.toFixed(3), unit: 'kg' },
        ],
      };
    },
  },

  // 4. Yield
  {
    id: 'yield',
    slug: 'yield',
    title: 'Percentage Yield Calculator',
    category: 'Industrial Processes',
    description: 'Calculate manufacturing yield percentage based on theoretical stoichiometry.',
    formula: '\\text{\\% Yield} = \\left( \\frac{\\text{Actual Yield}}{\\text{Theoretical Yield}} \\right) \\times 100',
    longExplanation: 'Evaluates process efficiency against chemical stoichiometry or target standard output.',
    useCases: ['Synthesis yield check', 'Fermentation product recovery assessment'],
    faqs: [{ question: 'Why can yield exceed 100%?', answer: 'Yield > 100% usually indicates retained solvent or moisture.' }],
    inputs: [
      { name: 'actual', label: 'Actual Yield Harvested', unit: 'kg', defaultValue: 88, type: 'number', min: 0 },
      { name: 'theoretical', label: 'Theoretical Expected Yield', unit: 'kg', defaultValue: 95, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const actual = Number(inputs.actual) || 0;
      const theoretical = Number(inputs.theoretical) || 1;
      const yieldPct = (actual / theoretical) * 100;
      return {
        results: [
          { label: 'Process Yield', value: yieldPct.toFixed(2), unit: '%', highlight: true },
          { label: 'Product Loss', value: (theoretical - actual).toFixed(2), unit: 'kg' },
        ],
      };
    },
  },

  // 5. Recovery
  {
    id: 'recovery',
    slug: 'recovery',
    title: 'Product Recovery Calculator',
    category: 'Industrial Processes',
    description: 'Calculate analyte or product recovery rate post extraction or purification.',
    formula: '\\text{\\% Recovery} = \\left( \\frac{\\text{Recovered Amount}}{\\text{Initial Total Amount}} \\right) \\times 100',
    longExplanation: 'Essential for downstream processing metrics in biopharma, dairy whey separation, and chromatography.',
    useCases: ['Chromatography elution efficiency', 'Protein isolation checks'],
    faqs: [{ question: 'What is ideal recovery?', answer: 'Typical industrial recovery targets range from 85% to 98%.' }],
    inputs: [
      { name: 'recovered', label: 'Recovered Mass', unit: 'kg', defaultValue: 42.5, type: 'number', min: 0 },
      { name: 'initial', label: 'Initial Feed Mass', unit: 'kg', defaultValue: 50, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const rec = Number(inputs.recovered) || 0;
      const init = Number(inputs.initial) || 1;
      const recoveryPct = (rec / init) * 100;
      return {
        results: [
          { label: 'Recovery Rate', value: recoveryPct.toFixed(2), unit: '%', highlight: true },
          { label: 'Unrecovered Residual', value: (init - rec).toFixed(2), unit: 'kg' },
        ],
      };
    },
  },

  // 6. Moisture
  {
    id: 'moisture',
    slug: 'moisture',
    title: 'Moisture Content Calculator (Wet Basis)',
    category: 'Food & Dairy',
    description: 'Determine water percentage in food, powders, or dairy samples.',
    formula: 'M_{wb} = \\left( \\frac{W_w - W_d}{W_w} \\right) \\times 100',
    longExplanation: 'Moisture content directly impacts milk powder shelf life, cheese yield, and grain storage safety.',
    useCases: ['Milk powder spray drying quality check', 'Grain storage moisture audit'],
    faqs: [{ question: 'What is wet basis vs dry basis?', answer: 'Wet basis expresses water mass over total wet mass, while dry basis expresses water mass over dry solid mass.' }],
    inputs: [
      { name: 'wetMass', label: 'Wet Sample Mass', unit: 'g', defaultValue: 10.0, type: 'number', min: 0.01 },
      { name: 'dryMass', label: 'Bone-Dry Sample Mass', unit: 'g', defaultValue: 9.35, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const wet = Number(inputs.wetMass) || 1;
      const dry = Number(inputs.dryMass) || 0;
      const moisturePct = ((wet - dry) / wet) * 100;
      const dryBasisPct = ((wet - dry) / dry) * 100;
      return {
        results: [
          { label: 'Moisture (Wet Basis)', value: moisturePct.toFixed(2), unit: '%', highlight: true },
          { label: 'Moisture (Dry Basis)', value: dryBasisPct.toFixed(2), unit: '%' },
          { label: 'Total Solids', value: (100 - moisturePct).toFixed(2), unit: '%' },
        ],
      };
    },
  },

  // 7. Loss on Drying (LOD)
  {
    id: 'loss-on-drying',
    slug: 'loss-on-drying',
    title: 'Loss on Drying (LOD) Calculator',
    category: 'Quality Control',
    description: 'Calculate volatile matter loss percentage after oven drying.',
    formula: '\\text{LOD \\%} = \\left( \\frac{\\text{Initial Mass} - \\text{Final Mass}}{\\text{Initial Mass}} \\right) \\times 100',
    longExplanation: 'LOD testing is standard in analytical quality control laboratories under Pharmacopeia USP/EP standards.',
    useCases: ['Pharmaceutical API moisture testing', 'Excipient quality control'],
    faqs: [{ question: 'Does LOD measure only water?', answer: 'LOD measures total volatile components including residual organic solvents evaporated at testing temperature.' }],
    inputs: [
      { name: 'initialMass', label: 'Tare + Sample Initial Weight', unit: 'g', defaultValue: 12.45, type: 'number', min: 0.01 },
      { name: 'finalMass', label: 'Tare + Sample Post-Drying Weight', unit: 'g', defaultValue: 12.12, type: 'number', min: 0.001 },
      { name: 'tare', label: 'Tare Container Weight', unit: 'g', defaultValue: 7.45, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const init = Number(inputs.initialMass) || 1;
      const fin = Number(inputs.finalMass) || 0;
      const tare = Number(inputs.tare) || 0;
      const netInit = init - tare;
      const netFin = fin - tare;
      const lod = ((netInit - netFin) / netInit) * 100;
      return {
        results: [
          { label: 'Loss on Drying (LOD)', value: lod.toFixed(2), unit: '%', highlight: true },
          { label: 'Volatile Mass Lost', value: (netInit - netFin).toFixed(4), unit: 'g' },
          { label: 'Residual Non-Volatile Mass', value: netFin.toFixed(4), unit: 'g' },
        ],
      };
    },
  },

  // 8. Solid : Solvent
  {
    id: 'solid-solvent',
    slug: 'solid-solvent',
    title: 'Solid to Solvent Ratio Calculator',
    category: 'Industrial Processes',
    description: 'Calculate required solvent volume for solid botanical or chemical extraction processes.',
    formula: 'V_{solvent} = M_{solid} \\times \\text{Ratio Factor}',
    longExplanation: 'Calculates necessary extractant solvent volume based on dry herb or chemical feedstock mass.',
    useCases: ['Phytochemical extraction', 'Herbal extract tincture preparation'],
    faqs: [{ question: 'What is a typical solid:solvent ratio?', answer: 'Common extraction ratios range from 1:5 to 1:20 (w/v).' }],
    inputs: [
      { name: 'solidMass', label: 'Solid Raw Material Mass', unit: 'kg', defaultValue: 50, type: 'number', min: 0.1 },
      { name: 'ratio', label: 'Solvent Multiplier (1 : X)', defaultValue: 8, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const mass = Number(inputs.solidMass) || 0;
      const ratio = Number(inputs.ratio) || 1;
      const solventVol = mass * ratio;
      return {
        results: [
          { label: 'Required Solvent Volume', value: solventVol.toFixed(1), unit: 'L', highlight: true },
          { label: 'Solid Loading Density', value: (100 / ratio).toFixed(2), unit: '% (w/v)' },
        ],
      };
    },
  },

  // 9. Dilution
  {
    id: 'dilution',
    slug: 'dilution',
    title: 'Concentration Dilution Calculator (C1V1 = C2V2)',
    category: 'General Chemistry',
    description: 'Calculate stock volume required to prepare a diluted target solution.',
    formula: 'C_1 V_1 = C_2 V_2 \\implies V_1 = \\frac{C_2 V_2}{C_1}',
    longExplanation: 'Solves stock solution dilution for liquid solutions, CIP chemicals, or stock reagents.',
    useCases: ['Preparing working stock buffers', 'CIP caustic soda dilution'],
    faqs: [{ question: 'Can I use % or molarity?', answer: 'Yes, as long as C1 and C2 share identical units.' }],
    inputs: [
      { name: 'c1', label: 'Stock Concentration (C1)', unit: '%', defaultValue: 50, type: 'number', min: 0.001 },
      { name: 'c2', label: 'Desired Target Concentration (C2)', unit: '%', defaultValue: 2.5, type: 'number', min: 0.0001 },
      { name: 'v2', label: 'Desired Final Volume (V2)', unit: 'L', defaultValue: 500, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const c1 = Number(inputs.c1) || 1;
      const c2 = Number(inputs.c2) || 0;
      const v2 = Number(inputs.v2) || 0;
      const v1 = (c2 * v2) / c1;
      const diluent = v2 - v1;
      return {
        results: [
          { label: 'Stock Solution Required (V1)', value: v1.toFixed(3), unit: 'L', highlight: true },
          { label: 'Diluent Water Required', value: diluent.toFixed(3), unit: 'L' },
          { label: 'Dilution Factor', value: (c1 / c2).toFixed(2), unit: 'x' },
        ],
      };
    },
  },

  // 10. Solution Preparation
  {
    id: 'solution-prep',
    slug: 'solution-prep',
    title: 'Chemical Solution Preparation Calculator',
    category: 'General Chemistry',
    description: 'Calculate exact solute mass needed to prepare target volume and molar concentration.',
    formula: '\\text{Mass (g)} = M \\times V \\times MW',
    longExplanation: 'Determines precise mass of dry solute needed for laboratory reagents and process additives.',
    useCases: ['HPLC mobile phase preparation', 'Reagent stock prep'],
    faqs: [{ question: 'What is MW?', answer: 'MW is the molecular weight (molar mass) in g/mol of the chemical compound.' }],
    inputs: [
      { name: 'molarity', label: 'Target Molarity (M)', unit: 'mol/L', defaultValue: 0.5, type: 'number', min: 0.0001 },
      { name: 'volume', label: 'Target Volume (V)', unit: 'L', defaultValue: 2.0, type: 'number', min: 0.001 },
      { name: 'mw', label: 'Molecular Weight (MW)', unit: 'g/mol', defaultValue: 58.44, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const m = Number(inputs.molarity) || 0;
      const v = Number(inputs.volume) || 0;
      const mw = Number(inputs.mw) || 1;
      const massG = m * v * mw;
      return {
        results: [
          { label: 'Required Solute Mass', value: massG.toFixed(3), unit: 'g', highlight: true },
          { label: 'Mass in Kilograms', value: (massG / 1000).toFixed(4), unit: 'kg' },
        ],
      };
    },
  },

  // 11. ppm
  {
    id: 'ppm',
    slug: 'ppm',
    title: 'Parts Per Million (ppm) Converter & Calculator',
    category: 'General Chemistry',
    description: 'Convert between ppm, mg/L, mass fractions, and percentage values.',
    formula: '1 \\text{ ppm} = 1 \\text{ mg/kg} = 1 \\text{ mg/L (water)} = 0.0001\\%',
    longExplanation: 'ppm units are ubiquitous in trace heavy metal testing, pesticide residues, and water chlorination.',
    useCases: ['Water chlorination monitoring', 'Heavy metal limits compliance'],
    faqs: [{ question: 'How to convert ppm to percentage?', answer: 'Divide ppm value by 10,000 to get percentage.' }],
    inputs: [
      { name: 'ppmValue', label: 'Concentration in ppm', unit: 'ppm', defaultValue: 250, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const ppm = Number(inputs.ppmValue) || 0;
      const pct = ppm / 10000;
      const mgL = ppm;
      const ppb = ppm * 1000;
      return {
        results: [
          { label: 'Percentage Equivalency', value: pct.toFixed(6), unit: '%', highlight: true },
          { label: 'Concentration (mg/L)', value: mgL.toFixed(2), unit: 'mg/L' },
          { label: 'Concentration (ppb)', value: ppb.toLocaleString(), unit: 'ppb' },
        ],
      };
    },
  },

  // 12. ppb
  {
    id: 'ppb',
    slug: 'ppb',
    title: 'Parts Per Billion (ppb) Calculator',
    category: 'General Chemistry',
    description: 'Convert ultra-trace ppb concentration metrics to ppm and ug/L.',
    formula: '1 \\text{ ppb} = 0.001 \\text{ ppm} = 1 \\text{ \\mu g/L}',
    longExplanation: 'Essential for ultra-pure water systems, elemental impurities USP <232>, and pesticide residues.',
    useCases: ['Ultrapure water QC', 'Trace pesticide residue audit'],
    faqs: [{ question: 'What is 1 ppb?', answer: '1 microgram per liter or 1 part in 1,000,000,000 parts.' }],
    inputs: [
      { name: 'ppbValue', label: 'Concentration in ppb', unit: 'ppb', defaultValue: 15, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const ppb = Number(inputs.ppbValue) || 0;
      const ppm = ppb / 1000;
      const ugL = ppb;
      return {
        results: [
          { label: 'ppm Value', value: ppm.toFixed(5), unit: 'ppm', highlight: true },
          { label: 'Micrograms per Liter', value: ugL.toFixed(2), unit: 'µg/L' },
        ],
      };
    },
  },

  // 13. Molarity
  {
    id: 'molarity',
    slug: 'molarity',
    title: 'Molarity (M) Calculator',
    category: 'General Chemistry',
    description: 'Calculate molar concentration of solute per liter of solution.',
    formula: 'M = \\frac{\\text{Mass (g)}}{\\text{MW (g/mol)} \\times \\text{Volume (L)}}',
    longExplanation: 'Calculates the molarity (mol/L) of liquid chemical solutions.',
    useCases: ['Analytical chemistry standard prep', 'Chemical synthesis'],
    faqs: [{ question: 'How does temperature affect molarity?', answer: 'Solution volume changes with temperature, causing slight variation in molarity.' }],
    inputs: [
      { name: 'mass', label: 'Solute Mass', unit: 'g', defaultValue: 58.44, type: 'number', min: 0.0001 },
      { name: 'mw', label: 'Molar Mass (MW)', unit: 'g/mol', defaultValue: 58.44, type: 'number', min: 0.1 },
      { name: 'volume', label: 'Solution Volume', unit: 'L', defaultValue: 1.0, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const mass = Number(inputs.mass) || 0;
      const mw = Number(inputs.mw) || 1;
      const vol = Number(inputs.volume) || 1;
      const molarity = mass / (mw * vol);
      const moles = mass / mw;
      return {
        results: [
          { label: 'Molarity (M)', value: molarity.toFixed(4), unit: 'mol/L', highlight: true },
          { label: 'Moles of Solute', value: moles.toFixed(4), unit: 'mol' },
        ],
      };
    },
  },

  // 14. Normality
  {
    id: 'normality',
    slug: 'normality',
    title: 'Normality (N) Calculator',
    category: 'General Chemistry',
    description: 'Calculate equivalent concentration per liter based on reactive valence/n-factor.',
    formula: 'N = M \\times n_{\\text{val}}',
    longExplanation: 'Normality is used in acid-base titrations and redox reactions where reactive equivalent per mole matters.',
    useCases: ['Acid-base titration analysis', 'Redox titration calculations'],
    faqs: [{ question: 'What is n-factor?', answer: 'For acids, n is number of H+ ions released; for bases, number of OH- ions.' }],
    inputs: [
      { name: 'molarity', label: 'Molarity (M)', unit: 'mol/L', defaultValue: 0.1, type: 'number', min: 0 },
      { name: 'nFactor', label: 'Valence / Equivalence Factor (n)', defaultValue: 2, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const m = Number(inputs.molarity) || 0;
      const n = Number(inputs.nFactor) || 1;
      const norm = m * n;
      return {
        results: [
          { label: 'Normality (N)', value: norm.toFixed(4), unit: 'eq/L', highlight: true },
          { label: 'Molarity Equivalent', value: m.toFixed(4), unit: 'mol/L' },
        ],
      };
    },
  },

  // 15. Molality
  {
    id: 'molality',
    slug: 'molality',
    title: 'Molality (m) Calculator',
    category: 'General Chemistry',
    description: 'Calculate moles of solute per kilogram of solvent.',
    formula: 'm = \\frac{\\text{Moles of Solute}}{\\text{Mass of Solvent (kg)}}',
    longExplanation: 'Molality is temperature-independent because solvent mass does not alter with thermal expansion.',
    useCases: ['Freezing point depression tests', 'Colligative property calculations'],
    faqs: [{ question: 'Why use molality over molarity?', answer: 'Molality remains constant across temperature changes.' }],
    inputs: [
      { name: 'soluteGrams', label: 'Solute Mass', unit: 'g', defaultValue: 30, type: 'number', min: 0 },
      { name: 'soluteMW', label: 'Solute Molecular Weight', unit: 'g/mol', defaultValue: 60.06, type: 'number', min: 0.1 },
      { name: 'solventKg', label: 'Solvent Mass', unit: 'kg', defaultValue: 1.0, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const g = Number(inputs.soluteGrams) || 0;
      const mw = Number(inputs.soluteMW) || 1;
      const kg = Number(inputs.solventKg) || 1;
      const moles = g / mw;
      const molality = moles / kg;
      return {
        results: [
          { label: 'Molality (m)', value: molality.toFixed(4), unit: 'mol/kg', highlight: true },
          { label: 'Moles Solute', value: moles.toFixed(4), unit: 'mol' },
        ],
      };
    },
  },

  // 16. Mole
  {
    id: 'mole',
    slug: 'mole',
    title: 'Mole & Molecule Quantity Calculator',
    category: 'General Chemistry',
    description: 'Convert substance mass to moles and total particle/molecule counts via Avogadro constant.',
    formula: 'n = \\frac{m}{M}, \\quad N = n \\times 6.022 \\times 10^{23}',
    longExplanation: 'Determines exact molar quantities and total discrete molecular counts.',
    useCases: ['Chemical stoichiometric calculations', 'Gas mole estimation'],
    faqs: [{ question: 'What is Avogadro’s number?', answer: '6.02214076 × 10²³ particles per mole.' }],
    inputs: [
      { name: 'mass', label: 'Mass', unit: 'g', defaultValue: 18.02, type: 'number', min: 0 },
      { name: 'mw', label: 'Molar Mass (MW)', unit: 'g/mol', defaultValue: 18.02, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const mass = Number(inputs.mass) || 0;
      const mw = Number(inputs.mw) || 1;
      const moles = mass / mw;
      const molecules = moles * 6.02214e23;
      return {
        results: [
          { label: 'Moles (n)', value: moles.toFixed(4), unit: 'mol', highlight: true },
          { label: 'Total Molecules', value: molecules.toExponential(4), unit: 'molecules' },
        ],
      };
    },
  },

  // 17. Equivalent Weight
  {
    id: 'equivalent-weight',
    slug: 'equivalent-weight',
    title: 'Equivalent Weight Calculator',
    category: 'General Chemistry',
    description: 'Calculate equivalent weight of acids, bases, and oxidizing/reducing agents.',
    formula: 'Eq. Wt. = \\frac{\\text{Molecular Weight}}{n_{\\text{factor}}}',
    longExplanation: 'Required for converting chemical concentrations to normality or electrochemistry equivalents.',
    useCases: ['Titration reagent standardization', 'Electro-chemical deposition'],
    faqs: [{ question: 'What is Eq Wt of H2SO4?', answer: 'MW = 98.08 g/mol, n = 2 (two protons), Eq Wt = 49.04 g/eq.' }],
    inputs: [
      { name: 'mw', label: 'Molecular Weight', unit: 'g/mol', defaultValue: 98.08, type: 'number', min: 0.1 },
      { name: 'nFactor', label: 'n-factor / Valence', defaultValue: 2, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const mw = Number(inputs.mw) || 1;
      const n = Number(inputs.nFactor) || 1;
      const eqWt = mw / n;
      return {
        results: [
          { label: 'Equivalent Weight', value: eqWt.toFixed(2), unit: 'g/eq', highlight: true },
        ],
      };
    },
  },

  // 18. Density
  {
    id: 'density',
    slug: 'density',
    title: 'Density (rho) & Volume Calculator',
    category: 'General Chemistry',
    description: 'Calculate mass, density, or volume of liquids and slurries.',
    formula: '\\rho = \\frac{m}{V}',
    longExplanation: 'Essential mass-volume relationship for process sizing, vessel loading, and mass flow rate estimation.',
    useCases: ['Tank level-to-mass conversion', 'Concentrated slurry density checks'],
    faqs: [{ question: 'What is water density at 20°C?', answer: 'Approximately 0.9982 g/cm³ or 998.2 kg/m³.' }],
    inputs: [
      { name: 'mass', label: 'Mass', unit: 'kg', defaultValue: 1250, type: 'number', min: 0 },
      { name: 'volume', label: 'Volume', unit: 'L', defaultValue: 1000, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const m = Number(inputs.mass) || 0;
      const v = Number(inputs.volume) || 1;
      const densityKgL = m / v;
      const densityGCm3 = densityKgL;
      const densityKgM3 = densityKgL * 1000;
      return {
        results: [
          { label: 'Density (kg/L)', value: densityKgL.toFixed(3), unit: 'kg/L', highlight: true },
          { label: 'Density (g/cm³)', value: densityGCm3.toFixed(3), unit: 'g/cm³' },
          { label: 'Density (kg/m³)', value: densityKgM3.toFixed(1), unit: 'kg/m³' },
        ],
      };
    },
  },

  // 19. Specific Gravity
  {
    id: 'specific-gravity',
    slug: 'specific-gravity',
    title: 'Specific Gravity (SG) Calculator',
    category: 'General Chemistry',
    description: 'Calculate relative liquid density compared to reference water.',
    formula: 'SG = \\frac{\\rho_{\\text{substance}}}{\\rho_{\\text{water}}}',
    longExplanation: 'Specific gravity evaluates liquid syrup density, acid concentrations, and fermentation hydrometer readings.',
    useCases: ['Wort hydrometer reading', 'Concentrated acid density audit'],
    faqs: [{ question: 'Is SG unitless?', answer: 'Yes, it is a dimensionless ratio of densities.' }],
    inputs: [
      { name: 'sampleDensity', label: 'Sample Density', unit: 'kg/m³', defaultValue: 1120, type: 'number', min: 0 },
      { name: 'waterDensity', label: 'Water Reference Density', unit: 'kg/m³', defaultValue: 998.2, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const sample = Number(inputs.sampleDensity) || 0;
      const water = Number(inputs.waterDensity) || 1;
      const sg = sample / water;
      return {
        results: [
          { label: 'Specific Gravity (SG)', value: sg.toFixed(4), unit: '', highlight: true },
        ],
      };
    },
  },

  // 20. Brix
  {
    id: 'brix',
    slug: 'brix',
    title: 'Degree Brix (°Bx) & Sugar Content Calculator',
    category: 'Food & Dairy',
    description: 'Convert Brix refractometer readings to sucrose mass, SG, and dry solids content.',
    formula: 'SG \\approx 1 + \\left( \\frac{^{\\circ}\\text{Bx}}{258.6 - \\left( \\frac{^{\\circ}\\text{Bx}}{258.2} \\times 227.1 \\right)} \\right)',
    longExplanation: 'Brix measures soluble sucrose solids in fruit juices, dairy concentrates, beverage syrups, and wine must.',
    useCases: ['Fruit juice refractometry', 'Condensed milk solids monitoring'],
    faqs: [{ question: 'What does 1 °Brix mean?', answer: '1 gram of sucrose in 100 grams of aqueous solution (1% w/w).' }],
    inputs: [
      { name: 'brix', label: 'Refractometer Brix Reading', unit: '°Bx', defaultValue: 45.0, type: 'number', min: 0, max: 100 },
      { name: 'totalVolume', label: 'Solution Total Volume', unit: 'L', defaultValue: 100, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const bx = Number(inputs.brix) || 0;
      const vol = Number(inputs.totalVolume) || 1;
      const sg = 1 + bx / (258.6 - (bx / 258.2) * 227.1);
      const massKg = vol * sg;
      const sugarMassKg = (massKg * bx) / 100;
      return {
        results: [
          { label: 'Est. Specific Gravity', value: sg.toFixed(3), highlight: true },
          { label: 'Total Batch Mass', value: massKg.toFixed(2), unit: 'kg' },
          { label: 'Total Dissolved Sugar Mass', value: sugarMassKg.toFixed(2), unit: 'kg' },
        ],
      };
    },
  },

  // 21. Concentration Factor
  {
    id: 'concentration-factor',
    slug: 'concentration-factor',
    title: 'Concentration Factor (CF) Calculator',
    category: 'Industrial Processes',
    description: 'Calculate volumetric concentration factor for evaporators, RO membranes, and filtration.',
    formula: 'CF = \\frac{V_{\\text{feed}}}{V_{\\text{retentate}}} = \\frac{C_{\\text{retentate}}}{C_{\\text{feed}}}',
    longExplanation: 'Measures how many times a solution stream has been concentrated in evaporators or ultrafiltration loops.',
    useCases: ['Whey protein concentrate (WPC) filtration', 'Evaporator concentration monitoring'],
    faqs: [{ question: 'What is CF in RO systems?', answer: 'It represents the ratio of feed flow rate over concentrate reject flow rate.' }],
    inputs: [
      { name: 'feedVol', label: 'Feed Initial Volume', unit: 'L', defaultValue: 10000, type: 'number', min: 1 },
      { name: 'concentrateVol', label: 'Concentrate Final Volume', unit: 'L', defaultValue: 2000, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const feed = Number(inputs.feedVol) || 1;
      const conc = Number(inputs.concentrateVol) || 1;
      const cf = feed / conc;
      const permeateVol = feed - conc;
      return {
        results: [
          { label: 'Concentration Factor (CF)', value: cf.toFixed(2), unit: 'x', highlight: true },
          { label: 'Permeate / Evaporated Volume', value: permeateVol.toFixed(1), unit: 'L' },
          { label: 'Volume Reduction Percentage', value: (((feed - conc) / feed) * 100).toFixed(1), unit: '%' },
        ],
      };
    },
  },

  // 22. Extraction Efficiency
  {
    id: 'extraction-efficiency',
    slug: 'extraction-efficiency',
    title: 'Extraction Efficiency Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate active target compound extraction yield from raw solid substrate.',
    formula: 'E = \\left( \\frac{m_{\\text{extracted}}}{m_{\\text{theoretical in biomass}}} \\right) \\times 100',
    longExplanation: 'Evaluates botanical extraction, solvent leaching, or protein recovery from biomass.',
    useCases: ['Essential oil extraction', 'Biomass polyphenol leaching'],
    faqs: [{ question: 'How to increase extraction yield?', answer: 'Optimize temperature, solid:solvent ratio, particle size, and agitation duration.' }],
    inputs: [
      { name: 'extractedMass', label: 'Mass Extracted', unit: 'g', defaultValue: 4.85, type: 'number', min: 0 },
      { name: 'totalInBiomass', label: 'Theoretical Active Mass in Raw Biomass', unit: 'g', defaultValue: 5.5, type: 'number', min: 0.01 },
    ],
    calculate: (inputs) => {
      const ext = Number(inputs.extractedMass) || 0;
      const total = Number(inputs.totalInBiomass) || 1;
      const eff = (ext / total) * 100;
      return {
        results: [
          { label: 'Extraction Efficiency', value: eff.toFixed(2), unit: '%', highlight: true },
          { label: 'Unextracted Residual Biomass Mass', value: (total - ext).toFixed(3), unit: 'g' },
        ],
      };
    },
  },

  // 23. Resin Loading
  {
    id: 'resin-loading',
    slug: 'resin-loading',
    title: 'Ion Exchange Resin Loading Capacity Calculator',
    category: 'Water & Environmental',
    description: 'Calculate ion-exchange column resin mass/volume required based on ionic load.',
    formula: 'V_{\\text{resin}} = \\frac{\\text{Total Ionic Load (eq)}}{\\text{Specific Resin Capacity (eq/L)}}',
    longExplanation: 'Sizes cation and anion exchange resin beds for water demineralization or protein capture.',
    useCases: ['Water demineralizer sizing', 'Bioprocess ion-exchange chromatography'],
    faqs: [{ question: 'What is typical resin capacity?', answer: 'Strong acid cation resins typically range between 1.8 to 2.2 eq/L.' }],
    inputs: [
      { name: 'totalIonLoad', label: 'Total Ionic Load', unit: 'eq', defaultValue: 450, type: 'number', min: 0 },
      { name: 'resinCapacity', label: 'Specific Resin Capacity', unit: 'eq/L', defaultValue: 1.9, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const load = Number(inputs.totalIonLoad) || 0;
      const cap = Number(inputs.resinCapacity) || 1;
      const resinVolL = load / cap;
      return {
        results: [
          { label: 'Required Resin Volume', value: resinVolL.toFixed(1), unit: 'L', highlight: true },
          { label: 'Resin Volume in m³', value: (resinVolL / 1000).toFixed(3), unit: 'm³' },
        ],
      };
    },
  },

  // 24. Bed Volume
  {
    id: 'bed-volume',
    slug: 'bed-volume',
    title: 'Bed Volume (BV) & Column Throughput Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate chromatography or filtration column bed volume and total throughput in BV.',
    formula: 'BV = \\pi \\times \\left( \\frac{D}{2} \\right)^2 \\times H, \\quad \\text{Throughput (BV)} = \\frac{V_{\\text{processed}}}{BV}',
    longExplanation: 'Bed volume defines packed column geometric capacity for loading, washing, and regeneration cycles.',
    useCases: ['Chromatography scaling', 'Carbon bed adsorption throughput monitoring'],
    faqs: [{ question: 'How is Bed Volume defined?', answer: 'Total volumetric capacity occupied by packed resin or media in the column.' }],
    inputs: [
      { name: 'columnDiameter', label: 'Column Diameter (D)', unit: 'cm', defaultValue: 20, type: 'number', min: 0.1 },
      { name: 'bedHeight', label: 'Bed Height (H)', unit: 'cm', defaultValue: 50, type: 'number', min: 0.1 },
      { name: 'volumeProcessed', label: 'Total Fluid Processed', unit: 'L', defaultValue: 1500, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const d = Number(inputs.columnDiameter) || 1;
      const h = Number(inputs.bedHeight) || 1;
      const processed = Number(inputs.volumeProcessed) || 0;
      const radius = d / 2;
      const bvCm3 = Math.PI * Math.pow(radius, 2) * h;
      const bvL = bvCm3 / 1000;
      const throughputBV = processed / bvL;
      return {
        results: [
          { label: 'Bed Volume (BV)', value: bvL.toFixed(2), unit: 'L', highlight: true },
          { label: 'Total Column Throughput', value: throughputBV.toFixed(1), unit: 'BV' },
        ],
      };
    },
  },

  // 25. Column Flow Rate
  {
    id: 'column-flow-rate',
    slug: 'column-flow-rate',
    title: 'Column Linear Velocity & Volumetric Flow Rate Calculator',
    category: 'Chemical Engineering',
    description: 'Convert between volumetric flow rate (L/h) and linear velocity (cm/h) in packed columns.',
    formula: 'u = \\frac{4 Q}{\\pi D^2}',
    longExplanation: 'Maintains linear velocity equivalence during chromatography scaling from bench to manufacturing.',
    useCases: ['Bioprocess chromatography scale-up', 'Filter bed loading rate check'],
    faqs: [{ question: 'Why is linear velocity important?', answer: 'Linear velocity governs residence time and pressure drop across packed beds regardless of column scale.' }],
    inputs: [
      { name: 'flowRate', label: 'Volumetric Flow Rate (Q)', unit: 'L/h', defaultValue: 60, type: 'number', min: 0 },
      { name: 'columnDiameter', label: 'Column Internal Diameter (D)', unit: 'cm', defaultValue: 15, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const q = Number(inputs.flowRate) || 0;
      const d = Number(inputs.columnDiameter) || 1;
      const areaCm2 = Math.PI * Math.pow(d / 2, 2);
      const qCm3h = q * 1000;
      const velocityCmH = qCm3h / areaCm2;
      return {
        results: [
          { label: 'Linear Velocity', value: velocityCmH.toFixed(1), unit: 'cm/h', highlight: true },
          { label: 'Cross-Sectional Area', value: areaCm2.toFixed(1), unit: 'cm²' },
        ],
      };
    },
  },

  // 26. Residence Time
  {
    id: 'residence-time',
    slug: 'residence-time',
    title: 'Residence Time (tau) Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate mean retention time of fluids in reactors, pasteurizers, or hold tubes.',
    formula: '\\tau = \\frac{V}{Q}',
    longExplanation: 'Residence time determines thermal exposure in pasteurization hold tubes and chemical conversion in CSTR reactors.',
    useCases: ['Pasteurization hold tube design', 'CSTR reactor conversion check'],
    faqs: [{ question: 'What units should be used?', answer: 'Ensure volume and flow rate time units match (e.g., L and L/min yields minutes).' }],
    inputs: [
      { name: 'vesselVol', label: 'Vessel / Tube Volume (V)', unit: 'L', defaultValue: 120, type: 'number', min: 0.1 },
      { name: 'flowRate', label: 'Volumetric Flow Rate (Q)', unit: 'L/min', defaultValue: 300, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const v = Number(inputs.vesselVol) || 1;
      const q = Number(inputs.flowRate) || 1;
      const tauMin = v / q;
      const tauSec = tauMin * 60;
      return {
        results: [
          { label: 'Residence Time', value: tauSec.toFixed(2), unit: 'seconds', highlight: true },
          { label: 'Residence Time', value: tauMin.toFixed(3), unit: 'minutes' },
        ],
      };
    },
  },

  // 27. Vacuum Conversion
  {
    id: 'vacuum-conversion',
    slug: 'vacuum-conversion',
    title: 'Vacuum & Absolute Pressure Converter',
    category: 'Utilities & Automation',
    description: 'Convert vacuum pressure metrics across mbar, mmHg, Torr, kPa, and inHg.',
    formula: 'P_{\\text{abs}} = P_{\\text{atm}} - P_{\\text{vacuum}}',
    longExplanation: 'Converts vacuum gauge readings to absolute pressure for freeze dryers, evaporators, and vacuum pans.',
    useCases: ['Lyophilization freeze dryer pressure check', 'Vacuum pan evaporation audit'],
    faqs: [{ question: 'What is standard atmospheric pressure?', answer: '1013.25 mbar = 760 mmHg = 101.325 kPa.' }],
    inputs: [
      { name: 'vacuumMbar', label: 'Vacuum Pressure', unit: 'mbar (abs)', defaultValue: 45, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const mbar = Number(inputs.vacuumMbar) || 0;
      const mmHg = mbar * 0.750062;
      const kPa = mbar * 0.1;
      const inHg = mbar * 0.02953;
      const torr = mmHg;
      return {
        results: [
          { label: 'Pressure (mmHg / Torr)', value: mmHg.toFixed(2), unit: 'mmHg', highlight: true },
          { label: 'Pressure (kPa)', value: kPa.toFixed(2), unit: 'kPa' },
          { label: 'Pressure (inHg)', value: inHg.toFixed(2), unit: 'inHg' },
        ],
      };
    },
  },

  // 28. Distillation Recovery
  {
    id: 'distillation-recovery',
    slug: 'distillation-recovery',
    title: 'Distillation Solvent Recovery Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate distilled overhead recovery percentage and bottoms residue ratio.',
    formula: '\\text{Distillate Recovery \\%} = \\left( \\frac{V_{\\text{distillate}}}{V_{\\text{feed}}} \\right) \\times 100',
    longExplanation: 'Evaluates solvent recycling efficiency in distillation columns and rotary evaporators.',
    useCases: ['Ethanol solvent recycling', 'Essential oil hydro-distillation'],
    faqs: [{ question: 'What factors reduce recovery?', answer: 'Thermal degradation, column weeping, entrainment, and non-condensable vapor losses.' }],
    inputs: [
      { name: 'feedVolume', label: 'Total Solvent Feed Volume', unit: 'L', defaultValue: 1000, type: 'number', min: 1 },
      { name: 'distillateVolume', label: 'Distillate Recovered Volume', unit: 'L', defaultValue: 885, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const feed = Number(inputs.feedVolume) || 1;
      const dist = Number(inputs.distillateVolume) || 0;
      const recoveryPct = (dist / feed) * 100;
      const bottoms = feed - dist;
      return {
        results: [
          { label: 'Solvent Recovery Rate', value: recoveryPct.toFixed(2), unit: '%', highlight: true },
          { label: 'Bottoms Waste Volume', value: bottoms.toFixed(1), unit: 'L' },
        ],
      };
    },
  },

  // 29. Filtration Flux
  {
    id: 'filtration-flux',
    slug: 'filtration-flux',
    title: 'Filtration Flux Rate (LMH) Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate membrane permeate flux rate in Liters per Meter squared per Hour (LMH).',
    formula: 'J = \\frac{V}{A \\times t}',
    longExplanation: 'Filtration flux measures membrane productivity in ultrafiltration (UF), microfiltration (MF), and reverse osmosis (RO).',
    useCases: ['Membrane fouling assessment', 'RO permeate flux tracking'],
    faqs: [{ question: 'What is LMH?', answer: 'Liters of permeate filtered per square meter of membrane surface area per hour.' }],
    inputs: [
      { name: 'permeateVol', label: 'Permeate Volume Filtered', unit: 'L', defaultValue: 450, type: 'number', min: 0 },
      { name: 'membraneArea', label: 'Membrane Surface Area', unit: 'm²', defaultValue: 15, type: 'number', min: 0.1 },
      { name: 'timeHours', label: 'Filtration Run Duration', unit: 'hours', defaultValue: 2, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const v = Number(inputs.permeateVol) || 0;
      const a = Number(inputs.membraneArea) || 1;
      const t = Number(inputs.timeHours) || 1;
      const lmh = v / (a * t);
      return {
        results: [
          { label: 'Permeate Flux (LMH)', value: lmh.toFixed(2), unit: 'L/m²/h', highlight: true },
          { label: 'Permeate Hourly Rate', value: (v / t).toFixed(1), unit: 'L/h' },
        ],
      };
    },
  },

  // 30. Drying Rate
  {
    id: 'drying-rate',
    slug: 'drying-rate',
    title: 'Industrial Drying Rate Calculator',
    category: 'Industrial Processes',
    description: 'Calculate water evaporation rate per unit area in industrial dryers.',
    formula: 'R = \\frac{m_{\\text{water evaporated}}}{A \\times t}',
    longExplanation: 'Evaluates moisture evaporation performance in fluid bed dryers, spray dryers, and tray dryers.',
    useCases: ['Fluid bed dryer validation', 'Milk powder spray dryer efficiency check'],
    faqs: [{ question: 'What controls drying rate?', answer: 'Air temperature, relative humidity, air flow velocity, and material surface area.' }],
    inputs: [
      { name: 'waterRemovedKg', label: 'Water Evaporated Mass', unit: 'kg', defaultValue: 120, type: 'number', min: 0 },
      { name: 'dryingArea', label: 'Drying Surface Area', unit: 'm²', defaultValue: 12, type: 'number', min: 0.1 },
      { name: 'timeHours', label: 'Drying Time', unit: 'hours', defaultValue: 3, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const m = Number(inputs.waterRemovedKg) || 0;
      const a = Number(inputs.dryingArea) || 1;
      const t = Number(inputs.timeHours) || 1;
      const rate = m / (a * t);
      return {
        results: [
          { label: 'Drying Rate', value: rate.toFixed(2), unit: 'kg/m²/h', highlight: true },
          { label: 'Evaporation Capacity', value: (m / t).toFixed(2), unit: 'kg/h' },
        ],
      };
    },
  },

  // 31. Moisture Removal
  {
    id: 'moisture-removal',
    slug: 'moisture-removal',
    title: 'Moisture Removal Mass Calculator',
    category: 'Industrial Processes',
    description: 'Calculate total water mass required to be evaporated to reach target final moisture.',
    formula: 'm_{w} = m_1 \\times \\left( 1 - \\frac{100 - M_1}{100 - M_2} \\right)',
    longExplanation: 'Calculates exact mass of water to evaporate when drying wet feed to specified final product moisture.',
    useCases: ['Dehydrator batch sizing', 'Grain drying mass balance'],
    faqs: [{ question: 'Why does dry mass remain constant?', answer: 'Only water evaporates; bone-dry solid mass remains invariant.' }],
    inputs: [
      { name: 'initialWetMass', label: 'Initial Wet Product Mass', unit: 'kg', defaultValue: 1000, type: 'number', min: 1 },
      { name: 'initialMoisture', label: 'Initial Moisture Content', unit: '%', defaultValue: 80, type: 'number', min: 0, max: 99.9 },
      { name: 'targetMoisture', label: 'Target Final Moisture Content', unit: '%', defaultValue: 5, type: 'number', min: 0, max: 99.9 },
    ],
    calculate: (inputs) => {
      const m1 = Number(inputs.initialWetMass) || 1;
      const w1 = Number(inputs.initialMoisture) || 0;
      const w2 = Number(inputs.targetMoisture) || 0;
      const dryMass = m1 * (1 - w1 / 100);
      const m2 = dryMass / (1 - w2 / 100);
      const waterRemoved = m1 - m2;
      return {
        results: [
          { label: 'Water Mass to Evaporate', value: waterRemoved.toFixed(2), unit: 'kg', highlight: true },
          { label: 'Final Dry Product Mass', value: m2.toFixed(2), unit: 'kg' },
          { label: 'Bone-Dry Solid Mass', value: dryMass.toFixed(2), unit: 'kg' },
        ],
      };
    },
  },

  // 32. Process Efficiency
  {
    id: 'process-efficiency',
    slug: 'process-efficiency',
    title: 'Process Efficiency Calculator',
    category: 'Industrial Processes',
    description: 'Calculate overall mass or energetic throughput conversion efficiency.',
    formula: '\\eta = \\left( \\frac{\\text{Useful Output}}{\\text{Total Input}} \\right) \\times 100',
    longExplanation: 'Evaluates process stream mass or energy conversion ratios.',
    useCases: ['Energy efficiency audits', 'Mass recovery assessment'],
    faqs: [{ question: 'What is a typical industrial process efficiency?', answer: 'Depends on unit operation; thermal evaporators ~85-92%, heat exchangers ~90-96%.' }],
    inputs: [
      { name: 'outputVal', label: 'Useful Output', unit: 'kW / kg', defaultValue: 850, type: 'number', min: 0 },
      { name: 'inputVal', label: 'Total Energy/Mass Input', unit: 'kW / kg', defaultValue: 1000, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const out = Number(inputs.outputVal) || 0;
      const inp = Number(inputs.inputVal) || 1;
      const eff = (out / inp) * 100;
      return {
        results: [
          { label: 'Process Efficiency (η)', value: eff.toFixed(2), unit: '%', highlight: true },
          { label: 'Loss / Waste Component', value: (inp - out).toFixed(2), unit: 'kW / kg' },
        ],
      };
    },
  },

  // 33. Overall Material Balance
  {
    id: 'overall-material-balance',
    slug: 'overall-material-balance',
    title: 'Overall Material Balance Calculator',
    category: 'Chemical Engineering',
    description: 'Validate Law of Conservation of Mass across input streams, product streams, and waste accumulation.',
    formula: '\\sum \\text{Mass}_{in} = \\sum \\text{Mass}_{out} + \\Delta \\text{Accumulation}',
    longExplanation: 'Verifies mass conservation balance across entire unit operations or plant sections.',
    useCases: ['Plant mass balance audit', 'Loss accountability review'],
    faqs: [{ question: 'What causes material imbalance?', answer: 'Unmetered leaks, unmeasured vent gases, scale calibration drift, or residual accumulation.' }],
    inputs: [
      { name: 'feedStream1', label: 'Inflow Stream 1 Mass', unit: 'kg/h', defaultValue: 5000, type: 'number', min: 0 },
      { name: 'feedStream2', label: 'Inflow Stream 2 Mass', unit: 'kg/h', defaultValue: 1200, type: 'number', min: 0 },
      { name: 'productStream', label: 'Product Main Stream Mass', unit: 'kg/h', defaultValue: 5800, type: 'number', min: 0 },
      { name: 'byproductStream', label: 'Byproduct / Waste Mass', unit: 'kg/h', defaultValue: 350, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const in1 = Number(inputs.feedStream1) || 0;
      const in2 = Number(inputs.feedStream2) || 0;
      const outProd = Number(inputs.productStream) || 0;
      const outBy = Number(inputs.byproductStream) || 0;
      const totalIn = in1 + in2;
      const totalOut = outProd + outBy;
      const diff = totalIn - totalOut;
      const lossPct = (diff / totalIn) * 100;
      return {
        results: [
          { label: 'Total Mass Input', value: totalIn.toFixed(1), unit: 'kg/h' },
          { label: 'Total Mass Output', value: totalOut.toFixed(1), unit: 'kg/h' },
          { label: 'Unaccounted Loss / Accumulation', value: diff.toFixed(1), unit: 'kg/h', highlight: true },
          { label: 'Imbalance Percentage', value: lossPct.toFixed(2), unit: '%' },
        ],
      };
    },
  },

  // 34. Pasteurization Holding Time
  {
    id: 'pasteurization-time',
    slug: 'pasteurization-time',
    title: 'Pasteurization Holding Time & F0/D-Value Calculator',
    category: 'Food & Dairy',
    description: 'Calculate pasteurization holding tube duration and thermal lethal value (F0 / PU).',
    formula: 't = \\frac{V_{\\text{hold tube}}}{Q}, \\quad F_0 = t \\times 10^{\\frac{T - 121.1}{z}}',
    longExplanation: 'Calculates HTST pasteurization retention time and thermal lethality units (PU) for milk, fruit juice, and beverage pasteurizers.',
    useCases: ['HTST milk pasteurization compliance', 'Juice aseptic processing F0 check'],
    faqs: [{ question: 'What is HTST milk pasteurization standard?', answer: '72°C (161.6°F) for at least 15 seconds.' }],
    inputs: [
      { name: 'tubeVolume', label: 'Holding Tube Volume', unit: 'L', defaultValue: 25.0, type: 'number', min: 0.1 },
      { name: 'flowRateLh', label: 'Pasteurizer Flow Rate', unit: 'L/h', defaultValue: 5000, type: 'number', min: 1 },
      { name: 'tempC', label: 'Pasteurization Temperature', unit: '°C', defaultValue: 72.0, type: 'number', min: 50 },
      { name: 'zValue', label: 'Microbial z-value', unit: '°C', defaultValue: 10.0, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const v = Number(inputs.tubeVolume) || 1;
      const qLh = Number(inputs.flowRateLh) || 1;
      const temp = Number(inputs.tempC) || 72;
      const z = Number(inputs.zValue) || 10;
      const qLs = qLh / 3600;
      const holdTimeSec = v / qLs;
      const puPerMin = Math.pow(10, (temp - 72) / z);
      const totalPU = (holdTimeSec / 60) * puPerMin;
      return {
        results: [
          { label: 'Holding Tube Time', value: holdTimeSec.toFixed(2), unit: 'seconds', highlight: true },
          { label: 'Pasteurization Units (PU)', value: totalPU.toFixed(2), unit: 'PU' },
          { label: 'Volumetric Flow Rate', value: qLs.toFixed(3), unit: 'L/sec' },
        ],
      };
    },
  },

  // 35. Heat Exchanger Efficiency
  {
    id: 'heat-exchanger-efficiency',
    slug: 'heat-exchanger-efficiency',
    title: 'Heat Exchanger Efficiency & LMTD Calculator',
    category: 'Utilities & Automation',
    description: 'Calculate Logarithmic Mean Temperature Difference (LMTD) and thermal effectiveness (epsilon).',
    formula: '\\text{LMTD} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}',
    longExplanation: 'Evaluates plate heat exchangers (PHE) and shell & tube thermal efficiency in heating and cooling loops.',
    useCases: ['Plate heat exchanger sizing', 'CIP wash heating loop audit'],
    faqs: [{ question: 'What does higher LMTD signify?', answer: 'Higher LMTD indicates a larger driving temperature difference for heat transfer.' }],
    inputs: [
      { name: 'thIn', label: 'Hot Fluid Inlet Temp (Th,in)', unit: '°C', defaultValue: 90, type: 'number' },
      { name: 'thOut', label: 'Hot Fluid Outlet Temp (Th,out)', unit: '°C', defaultValue: 55, type: 'number' },
      { name: 'tcIn', label: 'Cold Fluid Inlet Temp (Tc,in)', unit: '°C', defaultValue: 25, type: 'number' },
      { name: 'tcOut', label: 'Cold Fluid Outlet Temp (Tc,out)', unit: '°C', defaultValue: 60, type: 'number' },
    ],
    calculate: (inputs) => {
      const thIn = Number(inputs.thIn) || 90;
      const thOut = Number(inputs.thOut) || 55;
      const tcIn = Number(inputs.tcIn) || 25;
      const tcOut = Number(inputs.tcOut) || 60;
      const dt1 = thIn - tcOut;
      const dt2 = thOut - tcIn;
      let lmtd = 0;
      if (dt1 > 0 && dt2 > 0 && dt1 !== dt2) {
        lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
      } else {
        lmtd = (dt1 + dt2) / 2;
      }
      const maxPossibleDt = thIn - tcIn;
      const actualColdDt = tcOut - tcIn;
      const effectiveness = maxPossibleDt > 0 ? (actualColdDt / maxPossibleDt) * 100 : 0;
      return {
        results: [
          { label: 'LMTD', value: lmtd.toFixed(2), unit: '°C', highlight: true },
          { label: 'Thermal Effectiveness (ε)', value: effectiveness.toFixed(2), unit: '%' },
          { label: 'Hot Fluid Temperature Drop', value: (thIn - thOut).toFixed(1), unit: '°C' },
        ],
      };
    },
  },

  // 36. Reynolds Number
  {
    id: 'reynolds-number',
    slug: 'reynolds-number',
    title: 'Reynolds Number (Re) Flow Regime Calculator',
    category: 'Chemical Engineering',
    description: 'Determine fluid flow regime (Laminar, Transitional, or Turbulent) in industrial piping.',
    formula: 'Re = \\frac{\\rho v D}{\\mu} = \\frac{v D}{\\nu}',
    longExplanation: 'Predicts whether fluid flow in pipes or heat exchanger tubes is smooth (laminar, Re < 2100) or turbulent (Re > 4000).',
    useCases: ['CIP turbulent scouring flow check (Re > 10,000)', 'Viscous syrup pipe design'],
    faqs: [{ question: 'Why is turbulent flow required in CIP?', answer: 'High Reynolds number (Re > 10,000) provides mechanical shear to scour pipe walls clean.' }],
    inputs: [
      { name: 'density', label: 'Fluid Density (rho)', unit: 'kg/m³', defaultValue: 1000, type: 'number', min: 1 },
      { name: 'velocity', label: 'Fluid Velocity (v)', unit: 'm/s', defaultValue: 1.8, type: 'number', min: 0.01 },
      { name: 'pipeDiameterMm', label: 'Pipe Internal Diameter (D)', unit: 'mm', defaultValue: 50, type: 'number', min: 1 },
      { name: 'viscosityCp', label: 'Dynamic Viscosity (mu)', unit: 'cP (mPa·s)', defaultValue: 1.0, type: 'number', min: 0.01 },
    ],
    calculate: (inputs) => {
      const rho = Number(inputs.density) || 1000;
      const v = Number(inputs.velocity) || 1;
      const dMm = Number(inputs.pipeDiameterMm) || 50;
      const muCp = Number(inputs.viscosityCp) || 1;
      const dM = dMm / 1000;
      const muPas = muCp / 1000;
      const re = (rho * v * dM) / muPas;
      let regime = 'Laminar';
      if (re >= 2100 && re <= 4000) regime = 'Transitional';
      if (re > 4000) regime = 'Turbulent';
      return {
        results: [
          { label: 'Reynolds Number (Re)', value: Math.round(re).toLocaleString(), highlight: true },
          { label: 'Flow Regime', value: regime, highlight: true },
        ],
      };
    },
  },

  // 37. Pressure Drop
  {
    id: 'pressure-drop',
    slug: 'pressure-drop',
    title: 'Pipe Pressure Drop (Darcy-Weisbach) Calculator',
    category: 'Chemical Engineering',
    description: 'Calculate pressure loss due to pipe friction in sanitary fluid lines.',
    formula: '\\Delta P = f \\cdot \\left( \\frac{L}{D} \\right) \\cdot \\left( \\frac{\\rho v^2}{2} \\right)',
    longExplanation: 'Calculates pressure drop across straight pipe runs, valves, and fittings to size supply pumps.',
    useCases: ['Milk line pressure loss check', 'Viscous liquid pump head calculation'],
    faqs: [{ question: 'What is f in Darcy-Weisbach equation?', answer: 'Friction factor dependent on pipe roughness and Reynolds number.' }],
    inputs: [
      { name: 'length', label: 'Pipe Equivalent Length (L)', unit: 'm', defaultValue: 45, type: 'number', min: 0.1 },
      { name: 'pipeDiameterMm', label: 'Pipe Internal Diameter (D)', unit: 'mm', defaultValue: 50, type: 'number', min: 1 },
      { name: 'velocity', label: 'Fluid Velocity (v)', unit: 'm/s', defaultValue: 1.5, type: 'number', min: 0.01 },
      { name: 'density', label: 'Fluid Density', unit: 'kg/m³', defaultValue: 1000, type: 'number', min: 1 },
      { name: 'frictionFactor', label: 'Friction Factor (f)', defaultValue: 0.02, type: 'number', min: 0.001 },
    ],
    calculate: (inputs) => {
      const l = Number(inputs.length) || 1;
      const dMm = Number(inputs.pipeDiameterMm) || 50;
      const v = Number(inputs.velocity) || 1;
      const rho = Number(inputs.density) || 1000;
      const f = Number(inputs.frictionFactor) || 0.02;
      const dM = dMm / 1000;
      const deltaPPa = f * (l / dM) * ((rho * Math.pow(v, 2)) / 2);
      const deltaPBar = deltaPPa / 100000;
      const deltaPPSI = deltaPBar * 14.5038;
      return {
        results: [
          { label: 'Pressure Drop', value: deltaPBar.toFixed(3), unit: 'bar', highlight: true },
          { label: 'Pressure Drop', value: deltaPPSI.toFixed(2), unit: 'psi' },
          { label: 'Pressure Drop', value: (deltaPPa / 1000).toFixed(2), unit: 'kPa' },
        ],
      };
    },
  },

  // 38. Pump Horsepower
  {
    id: 'pump-horsepower',
    slug: 'pump-horsepower',
    title: 'Pump Brake Horsepower (BHP) & Power Calculator',
    category: 'Utilities & Automation',
    description: 'Calculate electrical motor power and shaft horsepower required for liquid pumps.',
    formula: 'BHP = \\frac{Q \\times H \\times SG}{3960 \\times \\eta}',
    longExplanation: 'Calculates pump shaft power (BHP) and motor power consumption (kW) for centrifugal and positive displacement pumps.',
    useCases: ['CIP booster pump motor sizing', 'Utility water pump selection'],
    faqs: [{ question: 'What is typical pump efficiency?', answer: 'Centrifugal pumps usually operate between 60% to 85% mechanical efficiency.' }],
    inputs: [
      { name: 'flowGpm', label: 'Flow Rate (Q)', unit: 'GPM', defaultValue: 120, type: 'number', min: 0.1 },
      { name: 'headFeet', label: 'Total Dynamic Head (H)', unit: 'feet of water', defaultValue: 85, type: 'number', min: 0.1 },
      { name: 'sg', label: 'Fluid Specific Gravity (SG)', defaultValue: 1.0, type: 'number', min: 0.1 },
      { name: 'efficiencyPct', label: 'Pump Efficiency (eta)', unit: '%', defaultValue: 75, type: 'number', min: 1, max: 100 },
    ],
    calculate: (inputs) => {
      const q = Number(inputs.flowGpm) || 1;
      const h = Number(inputs.headFeet) || 1;
      const sg = Number(inputs.sg) || 1;
      const eta = (Number(inputs.efficiencyPct) || 75) / 100;
      const bhp = (q * h * sg) / (3960 * eta);
      const kw = bhp * 0.7457;
      return {
        results: [
          { label: 'Brake Horsepower (BHP)', value: bhp.toFixed(2), unit: 'HP', highlight: true },
          { label: 'Motor Power Required', value: kw.toFixed(2), unit: 'kW' },
        ],
      };
    },
  },

  // 39. Pipe Flow Velocity
  {
    id: 'pipe-flow-velocity',
    slug: 'pipe-flow-velocity',
    title: 'Pipe Flow Velocity Calculator',
    category: 'Utilities & Automation',
    description: 'Calculate average linear flow velocity from pipe internal diameter and volumetric flow rate.',
    formula: 'v = \\frac{Q}{A} = \\frac{4 Q}{\\pi D^2}',
    longExplanation: 'Ensures fluid velocities remain within sanitary standards (1.5 - 2.5 m/s) to prevent bio-fouling or water hammer.',
    useCases: ['Sanitary stainless steel pipe sizing', 'CIP return line velocity check'],
    faqs: [{ question: 'What is ideal sanitary flow velocity?', answer: 'Target 1.5 m/s to 2.5 m/s for CIP scouring without excessive pressure drop.' }],
    inputs: [
      { name: 'flowLh', label: 'Volumetric Flow Rate (Q)', unit: 'L/h', defaultValue: 12000, type: 'number', min: 1 },
      { name: 'pipeMm', label: 'Pipe Internal Diameter (D)', unit: 'mm', defaultValue: 50, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const qLh = Number(inputs.flowLh) || 1;
      const dMm = Number(inputs.pipeMm) || 50;
      const qM3s = qLh / 3600000;
      const dM = dMm / 1000;
      const area = Math.PI * Math.pow(dM / 2, 2);
      const v = qM3s / area;
      return {
        results: [
          { label: 'Flow Velocity', value: v.toFixed(2), unit: 'm/s', highlight: true },
          { label: 'Pipe Cross-Sectional Area', value: (area * 10000).toFixed(2), unit: 'cm²' },
        ],
      };
    },
  },

  // 40. Steam Requirement
  {
    id: 'steam-requirement',
    slug: 'steam-requirement',
    title: 'Process Steam Mass Flow Requirement Calculator',
    category: 'Utilities & Automation',
    description: 'Calculate saturated steam mass flow rate (kg/h) required for heating process fluids.',
    formula: 'm_{\\text{steam}} = \\frac{m \\cdot C_p \\cdot (T_2 - T_1)}{\\lambda_{\\text{steam}} \\cdot \\eta}',
    longExplanation: 'Calculates steam consumption in boiler heat exchangers, jacketed kettles, and sterilizers.',
    useCases: ['Sterilizer boiler steam load estimation', 'Pasteurization heating loop steam audit'],
    faqs: [{ question: 'What is latent heat of steam?', answer: 'Around 2200 kJ/kg at standard 2-3 bar saturated steam pressures.' }],
    inputs: [
      { name: 'productFlowKgH', label: 'Product Feed Mass Flow', unit: 'kg/h', defaultValue: 5000, type: 'number', min: 1 },
      { name: 'cp', label: 'Product Specific Heat (Cp)', unit: 'kJ/kg·°C', defaultValue: 3.9, type: 'number', min: 0.1 },
      { name: 'tempIn', label: 'Inlet Temp (T1)', unit: '°C', defaultValue: 10, type: 'number' },
      { name: 'tempOut', label: 'Target Outlet Temp (T2)', unit: '°C', defaultValue: 85, type: 'number' },
      { name: 'latentHeat', label: 'Steam Latent Heat (lambda)', unit: 'kJ/kg', defaultValue: 2163, type: 'number', min: 500 },
      { name: 'efficiencyPct', label: 'Heater Efficiency', unit: '%', defaultValue: 92, type: 'number', min: 10, max: 100 },
    ],
    calculate: (inputs) => {
      const mProd = Number(inputs.productFlowKgH) || 1;
      const cp = Number(inputs.cp) || 3.9;
      const t1 = Number(inputs.tempIn) || 10;
      const t2 = Number(inputs.tempOut) || 85;
      const hfg = Number(inputs.latentHeat) || 2163;
      const eta = (Number(inputs.efficiencyPct) || 92) / 100;
      const qKw = (mProd * cp * (t2 - t1)) / 3600;
      const mSteamKgH = (qKw * 3600) / (hfg * eta);
      return {
        results: [
          { label: 'Steam Requirement', value: mSteamKgH.toFixed(1), unit: 'kg/h', highlight: true },
          { label: 'Heat Duty Required', value: qKw.toFixed(1), unit: 'kW' },
        ],
      };
    },
  },

  // 41. Boiler Efficiency
  {
    id: 'boiler-efficiency',
    slug: 'boiler-efficiency',
    title: 'Industrial Boiler Efficiency Calculator (Direct Method)',
    category: 'Utilities & Automation',
    description: 'Calculate fuel-to-steam thermal conversion efficiency of plant steam boilers.',
    formula: '\\eta_{\\text{boiler}} = \\left( \\frac{m_{\\text{steam}} \\times (h_{\\text{steam}} - h_{\\text{feedwater}})}{m_{\\text{fuel}} \\times GCV} \\right) \\times 100',
    longExplanation: 'Direct input-output method to audit industrial boiler performance and fuel economy.',
    useCases: ['Plant utility audit', 'Boiler fuel economy optimization'],
    faqs: [{ question: 'What is typical boiler efficiency?', answer: 'Modern gas/oil boilers operate at 80% to 88% GCV efficiency.' }],
    inputs: [
      { name: 'steamGenKgH', label: 'Steam Generated Rate', unit: 'kg/h', defaultValue: 4000, type: 'number', min: 1 },
      { name: 'fuelConsKgH', label: 'Fuel Consumed Rate', unit: 'kg/h', defaultValue: 280, type: 'number', min: 0.1 },
      { name: 'fuelGcv', label: 'Fuel Gross Calorific Value (GCV)', unit: 'kJ/kg', defaultValue: 44000, type: 'number', min: 1000 },
      { name: 'enthalpyDiff', label: 'Steam - Feedwater Enthalpy Difference', unit: 'kJ/kg', defaultValue: 2450, type: 'number', min: 100 },
    ],
    calculate: (inputs) => {
      const ms = Number(inputs.steamGenKgH) || 1;
      const mf = Number(inputs.fuelConsKgH) || 1;
      const gcv = Number(inputs.fuelGcv) || 1;
      const dh = Number(inputs.enthalpyDiff) || 1;
      const heatOut = ms * dh;
      const heatIn = mf * gcv;
      const eff = (heatOut / heatIn) * 100;
      return {
        results: [
          { label: 'Boiler Efficiency', value: eff.toFixed(2), unit: '%', highlight: true },
          { label: 'Specific Fuel Ratio', value: (mf / ms).toFixed(3), unit: 'kg fuel / kg steam' },
        ],
      };
    },
  },

  // 42. Cooling Load
  {
    id: 'cooling-load',
    slug: 'cooling-load',
    title: 'Process Cooling Load & Chiller Tonnage Calculator',
    category: 'Utilities & Automation',
    description: 'Calculate refrigeration capacity requirement in Tons of Refrigeration (TR) and kW.',
    formula: 'Q = \\frac{m \\cdot C_p \\cdot (T_{\\text{in}} - T_{\\text{out}})}{3600}, \\quad \\text{TR} = \\frac{Q}{3.517}',
    longExplanation: 'Sizes industrial glycol chillers and cold storage refrigeration systems.',
    useCases: ['Milk chilling line load check', 'Fermentation glycol jacket cooling audit'],
    faqs: [{ question: 'What is 1 Ton of Refrigeration (TR)?', answer: '3.517 kW or 12,000 BTU/hr of cooling load.' }],
    inputs: [
      { name: 'flowKgH', label: 'Fluid Flow Rate', unit: 'kg/h', defaultValue: 10000, type: 'number', min: 1 },
      { name: 'cp', label: 'Specific Heat (Cp)', unit: 'kJ/kg·°C', defaultValue: 3.9, type: 'number', min: 0.1 },
      { name: 'tempIn', label: 'Inlet Fluid Temp', unit: '°C', defaultValue: 35, type: 'number' },
      { name: 'tempOut', label: 'Target Chilled Outlet Temp', unit: '°C', defaultValue: 4, type: 'number' },
    ],
    calculate: (inputs) => {
      const m = Number(inputs.flowKgH) || 1;
      const cp = Number(inputs.cp) || 3.9;
      const tin = Number(inputs.tempIn) || 35;
      const tout = Number(inputs.tempOut) || 4;
      const qKw = (m * cp * (tin - tout)) / 3600;
      const tr = qKw / 3.517;
      return {
        results: [
          { label: 'Cooling Duty (TR)', value: tr.toFixed(1), unit: 'TR', highlight: true },
          { label: 'Cooling Capacity', value: qKw.toFixed(1), unit: 'kW' },
          { label: 'Cooling Capacity', value: (qKw * 3412.14).toFixed(0), unit: 'BTU/h' },
        ],
      };
    },
  },

  // 43. CIP Chemical Requirement
  {
    id: 'cip-chemical-req',
    slug: 'cip-chemical-req',
    title: 'CIP Caustic & Acid Chemical Dose Calculator',
    category: 'Food & Dairy',
    description: 'Calculate mass/volume of concentrated chemical required for CIP tank dosing.',
    formula: 'V_{\\text{chemical}} = \\frac{C_{\\text{target}} \\times V_{\\text{CIP tank}}}{C_{\\text{stock}}}',
    longExplanation: 'Calculates stock sodium hydroxide (NaOH) or nitric/phosphoric acid volume needed for Clean-in-Place (CIP) wash cycles.',
    useCases: ['Dairy CIP tank chemical makeup', 'Brewery vessel caustic dosing'],
    faqs: [{ question: 'What is typical CIP caustic concentration?', answer: '1.5% to 2.5% w/w NaOH at 70-80°C.' }],
    inputs: [
      { name: 'tankVolumeL', label: 'CIP Wash Tank Volume', unit: 'L', defaultValue: 2000, type: 'number', min: 10 },
      { name: 'targetPct', label: 'Desired Working Concentration', unit: '% (w/v)', defaultValue: 2.0, type: 'number', min: 0.1 },
      { name: 'stockPct', label: 'Stock Chemical Concentration', unit: '% (w/v)', defaultValue: 50.0, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const vTank = Number(inputs.tankVolumeL) || 1;
      const cTarget = Number(inputs.targetPct) || 0;
      const cStock = Number(inputs.stockPct) || 1;
      const vChem = (cTarget * vTank) / cStock;
      return {
        results: [
          { label: 'Stock Chemical Volume Needed', value: vChem.toFixed(2), unit: 'L', highlight: true },
          { label: 'Water Volume Needed', value: (vTank - vChem).toFixed(2), unit: 'L' },
        ],
      };
    },
  },

  // 44. COD Reduction
  {
    id: 'cod-reduction',
    slug: 'cod-reduction',
    title: 'COD Reduction & Wastewater Treatment Calculator',
    category: 'Water & Environmental',
    description: 'Calculate Chemical Oxygen Demand (COD) removal efficiency percentage in ETP effluent.',
    formula: '\\text{COD Reduction \\%} = \\left( \\frac{\\text{COD}_{in} - \\text{COD}_{out}}{\\text{COD}_{in}} \\right) \\times 100',
    longExplanation: 'Evaluates Effluent Treatment Plant (ETP) chemical oxidation and biological reactor removal efficiency.',
    useCases: ['ETP plant compliance check', 'Anoxic reactor COD reduction audit'],
    faqs: [{ question: 'What is COD?', answer: 'Chemical Oxygen Demand: total oxygen consumed to chemically oxidize organic pollutants.' }],
    inputs: [
      { name: 'codIn', label: 'Influent COD Concentration', unit: 'mg/L', defaultValue: 3200, type: 'number', min: 1 },
      { name: 'codOut', label: 'Effluent COD Concentration', unit: 'mg/L', defaultValue: 180, type: 'number', min: 0 },
      { name: 'flowM3d', label: 'Daily Wastewater Flow', unit: 'm³/day', defaultValue: 250, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const cin = Number(inputs.codIn) || 1;
      const cout = Number(inputs.codOut) || 0;
      const flow = Number(inputs.flowM3d) || 1;
      const reductionPct = ((cin - cout) / cin) * 100;
      const codLoadKgD = ((cin - cout) * flow) / 1000;
      return {
        results: [
          { label: 'COD Removal Efficiency', value: reductionPct.toFixed(2), unit: '%', highlight: true },
          { label: 'COD Mass Removed', value: codLoadKgD.toFixed(1), unit: 'kg COD / day' },
        ],
      };
    },
  },

  // 45. BOD Removal
  {
    id: 'bod-removal',
    slug: 'bod-removal',
    title: 'BOD Removal & Aerobic Reactor Calculator',
    category: 'Water & Environmental',
    description: 'Calculate Biological Oxygen Demand (BOD5) removal rate across aeration basins.',
    formula: '\\text{BOD Removal \\%} = \\left( \\frac{\\text{BOD}_{in} - \\text{BOD}_{out}}{\\text{BOD}_{in}} \\right) \\times 100',
    longExplanation: 'Measures organic bio-degradable load removal in activated sludge plants and aeration lagoons.',
    useCases: ['Aeration basin performance check', 'Dairy ETP discharge compliance'],
    faqs: [{ question: 'What is BOD5?', answer: 'Oxygen consumed by microorganisms over 5 days incubation at 20°C.' }],
    inputs: [
      { name: 'bodIn', label: 'Influent BOD5', unit: 'mg/L', defaultValue: 1800, type: 'number', min: 1 },
      { name: 'bodOut', label: 'Effluent BOD5', unit: 'mg/L', defaultValue: 25, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const bin = Number(inputs.bodIn) || 1;
      const bout = Number(inputs.bodOut) || 0;
      const removalPct = ((bin - bout) / bin) * 100;
      return {
        results: [
          { label: 'BOD Removal Efficiency', value: removalPct.toFixed(2), unit: '%', highlight: true },
          { label: 'Concentration Delta', value: (bin - bout).toFixed(1), unit: 'mg/L' },
        ],
      };
    },
  },

  // 46. Wastewater Loading
  {
    id: 'wastewater-loading',
    slug: 'wastewater-loading',
    title: 'Wastewater Organic & Population Equivalent Calculator',
    category: 'Water & Environmental',
    description: 'Calculate total daily organic load (kg BOD/day) and Population Equivalent (PE).',
    formula: '\\text{Organic Load (kg/d)} = \\frac{Q (\\text{m}^3/\\text{d}) \\times \\text{BOD (mg/L)}}{1000}, \\quad \\text{PE} = \\frac{\\text{Organic Load (g/d)}}{60}',
    longExplanation: 'Translates industrial effluent discharge metrics into domestic Population Equivalent (PE) units.',
    useCases: ['ETP design sizing', 'Municipal discharge fee audit'],
    faqs: [{ question: 'What is 1 Population Equivalent (PE)?', answer: 'Standardized at 60 grams of BOD5 per person per day.' }],
    inputs: [
      { name: 'flowM3D', label: 'Effluent Daily Flow (Q)', unit: 'm³/day', defaultValue: 500, type: 'number', min: 1 },
      { name: 'bodMgL', label: 'BOD Concentration', unit: 'mg/L', defaultValue: 1200, type: 'number', min: 1 },
    ],
    calculate: (inputs) => {
      const q = Number(inputs.flowM3D) || 1;
      const bod = Number(inputs.bodMgL) || 1;
      const loadKgD = (q * bod) / 1000;
      const pe = (loadKgD * 1000) / 60;
      return {
        results: [
          { label: 'Organic Load', value: loadKgD.toFixed(1), unit: 'kg BOD / day', highlight: true },
          { label: 'Population Equivalent (PE)', value: Math.round(pe).toLocaleString(), unit: 'PE' },
        ],
      };
    },
  },

  // 47. Fermentation Yield
  {
    id: 'fermentation-yield',
    slug: 'fermentation-yield',
    title: 'Bioprocess Fermentation Product Yield (Yp/s) Calculator',
    category: 'Biotechnology',
    description: 'Calculate product yield coefficient per unit mass substrate consumed (Yp/s).',
    formula: 'Y_{p/s} = \\frac{P - P_0}{S_0 - S}',
    longExplanation: 'Evaluates metabolic stoichiometry in bacterial, yeast, or fungal fermentations.',
    useCases: ['Ethanol fermentation efficiency audit', 'Recombinant protein yield evaluation'],
    faqs: [{ question: 'What is theoretical ethanol yield on glucose?', answer: '0.511 g ethanol per g glucose consumed.' }],
    inputs: [
      { name: 'p0', label: 'Initial Product Concentration (P0)', unit: 'g/L', defaultValue: 0, type: 'number', min: 0 },
      { name: 'pFinal', label: 'Final Product Concentration (P)', unit: 'g/L', defaultValue: 48.5, type: 'number', min: 0 },
      { name: 's0', label: 'Initial Substrate Glucose (S0)', unit: 'g/L', defaultValue: 100, type: 'number', min: 0.1 },
      { name: 'sFinal', label: 'Residual Substrate Glucose (S)', unit: 'g/L', defaultValue: 2.0, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const p0 = Number(inputs.p0) || 0;
      const p = Number(inputs.pFinal) || 0;
      const s0 = Number(inputs.s0) || 1;
      const s = Number(inputs.sFinal) || 0;
      const deltaP = p - p0;
      const deltaS = s0 - s;
      const yps = deltaS > 0 ? deltaP / deltaS : 0;
      const pctTheoEthanol = (yps / 0.511) * 100;
      return {
        results: [
          { label: 'Yield Coefficient (Yp/s)', value: yps.toFixed(3), unit: 'g product / g substrate', highlight: true },
          { label: '% of Theoretical Ethanol Yield', value: pctTheoEthanol.toFixed(1), unit: '%' },
        ],
      };
    },
  },

  // 48. Microbial Growth Rate
  {
    id: 'microbial-growth-rate',
    slug: 'microbial-growth-rate',
    title: 'Microbial Growth Rate (mu) & Doubling Time Calculator',
    category: 'Biotechnology',
    description: 'Calculate specific growth rate (mu) and cell doubling time (td) during exponential growth phase.',
    formula: '\\mu = \\frac{\\ln(X_2) - \\ln(X_1)}{t_2 - t_1}, \\quad t_d = \\frac{\\ln(2)}{\\mu}',
    longExplanation: 'Determines kinetic growth parameters of bioreactor cultures during log growth phase.',
    useCases: ['Bioreactor log phase growth tracking', 'Yeast propagation kinetic analysis'],
    faqs: [{ question: 'What is E. coli doubling time in ideal media?', answer: 'Approximately 20 minutes (mu ~ 2.07 h⁻¹).' }],
    inputs: [
      { name: 'x1', label: 'Initial Cell Biomass (X1)', unit: 'OD600 or g/L', defaultValue: 0.2, type: 'number', min: 0.001 },
      { name: 'x2', label: 'Final Cell Biomass (X2)', unit: 'OD600 or g/L', defaultValue: 3.5, type: 'number', min: 0.001 },
      { name: 'deltaTime', label: 'Elapsed Culture Time', unit: 'hours', defaultValue: 4.0, type: 'number', min: 0.1 },
    ],
    calculate: (inputs) => {
      const x1 = Number(inputs.x1) || 0.001;
      const x2 = Number(inputs.x2) || 0.001;
      const dt = Number(inputs.deltaTime) || 1;
      const mu = (Math.log(x2) - Math.log(x1)) / dt;
      const tdMin = (Math.log(2) / mu) * 60;
      return {
        results: [
          { label: 'Specific Growth Rate (μ)', value: mu.toFixed(3), unit: 'h⁻¹', highlight: true },
          { label: 'Doubling Time (td)', value: tdMin.toFixed(1), unit: 'minutes' },
          { label: 'Number of Generations (n)', value: ((Math.log(x2) - Math.log(x1)) / Math.log(2)).toFixed(2) },
        ],
      };
    },
  },

  // 49. OEE (Overall Equipment Effectiveness)
  {
    id: 'oee',
    slug: 'oee',
    title: 'OEE (Overall Equipment Effectiveness) Calculator',
    category: 'Production & Manufacturing',
    description: 'Calculate World-Class OEE percentage from Availability, Performance, and Quality metrics.',
    formula: '\\text{OEE} = \\text{Availability} \\times \\text{Performance} \\times \\text{Quality}',
    longExplanation: 'Standard lean manufacturing KPI measuring actual manufacturing productivity relative to full potential.',
    useCases: ['Packaging line productivity audit', 'Filling line bottleneck analysis'],
    faqs: [{ question: 'What is World Class OEE?', answer: 'World Class OEE benchmark is 85% (Availability: 90%, Performance: 95%, Quality: 99%).' }],
    inputs: [
      { name: 'plannedOperatingTime', label: 'Planned Operating Time', unit: 'minutes', defaultValue: 480, type: 'number', min: 1 },
      { name: 'downtime', label: 'Unplanned Downtime', unit: 'minutes', defaultValue: 35, type: 'number', min: 0 },
      { name: 'idealCycleTime', label: 'Ideal Cycle Time per Unit', unit: 'seconds', defaultValue: 1.2, type: 'number', min: 0.1 },
      { name: 'totalCount', label: 'Total Units Produced', unit: 'units', defaultValue: 20000, type: 'number', min: 0 },
      { name: 'rejectCount', label: 'Defective / Rejected Units', unit: 'units', defaultValue: 250, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const planned = Number(inputs.plannedOperatingTime) || 1;
      const down = Number(inputs.downtime) || 0;
      const idealSec = Number(inputs.idealCycleTime) || 1;
      const total = Number(inputs.totalCount) || 0;
      const rejects = Number(inputs.rejectCount) || 0;
      const runTime = planned - down;
      const availability = runTime / planned;
      const idealRatePerMin = 60 / idealSec;
      const performance = runTime > 0 ? total / (runTime * idealRatePerMin) : 0;
      const goodCount = total - rejects;
      const quality = total > 0 ? goodCount / total : 0;
      const oeePct = availability * performance * quality * 100;
      return {
        results: [
          { label: 'Overall Equipment Effectiveness (OEE)', value: oeePct.toFixed(2), unit: '%', highlight: true },
          { label: 'Availability Factor', value: (availability * 100).toFixed(1), unit: '%' },
          { label: 'Performance Factor', value: (performance * 100).toFixed(1), unit: '%' },
          { label: 'Quality Rate', value: (quality * 100).toFixed(1), unit: '%' },
        ],
        chartData: [
          { name: 'Availability', value: Number((availability * 100).toFixed(1)), unit: '%' },
          { name: 'Performance', value: Number((performance * 100).toFixed(1)), unit: '%' },
          { name: 'Quality', value: Number((quality * 100).toFixed(1)), unit: '%' },
        ],
      };
    },
  },

  // 50. Carbon Footprint Estimator
  {
    id: 'carbon-footprint',
    slug: 'carbon-footprint',
    title: 'Industrial Process Carbon Footprint (CO2e) Calculator',
    category: 'Packaging & Modern Tech',
    description: 'Calculate Scope 1 & Scope 2 Greenhouse Gas emissions (kg CO2e) for industrial batch runs.',
    formula: '\\text{CO}_2\\text{e} = (E_{\\text{kWh}} \\times EF_{\\text{elec}}) + (F_{\\text{fuel}} \\times EF_{\\text{fuel}})',
    longExplanation: 'Estimates total carbon equivalent emissions from electrical power consumption and boiler fuel usage.',
    useCases: ['Sustainability ESG reporting', 'Product carbon footprint labeling'],
    faqs: [{ question: 'What is Scope 1 vs Scope 2?', answer: 'Scope 1 covers direct fuel burned on site; Scope 2 covers indirect electricity purchased.' }],
    inputs: [
      { name: 'elecKwh', label: 'Electricity Consumption', unit: 'kWh', defaultValue: 1250, type: 'number', min: 0 },
      { name: 'gridEf', label: 'Grid Emission Factor', unit: 'kg CO2e / kWh', defaultValue: 0.82, type: 'number', min: 0 },
      { name: 'fuelKg', label: 'Boiler Fuel Consumed', unit: 'kg', defaultValue: 180, type: 'number', min: 0 },
      { name: 'fuelEf', label: 'Fuel Emission Factor', unit: 'kg CO2e / kg fuel', defaultValue: 3.15, type: 'number', min: 0 },
    ],
    calculate: (inputs) => {
      const elec = Number(inputs.elecKwh) || 0;
      const gEf = Number(inputs.gridEf) || 0;
      const fuel = Number(inputs.fuelKg) || 0;
      const fEf = Number(inputs.fuelEf) || 0;
      const scope2 = elec * gEf;
      const scope1 = fuel * fEf;
      const totalCO2e = scope1 + scope2;
      return {
        results: [
          { label: 'Total Greenhouse Emissions', value: (totalCO2e / 1000).toFixed(3), unit: 'Metric Tons CO2e', highlight: true },
          { label: 'Scope 2 (Electricity)', value: scope2.toFixed(1), unit: 'kg CO2e' },
          { label: 'Scope 1 (Boiler Fuel)', value: scope1.toFixed(1), unit: 'kg CO2e' },
        ],
        chartData: [
          { name: 'Scope 1 Direct', value: Number(scope1.toFixed(1)), unit: 'kg CO2e' },
          { name: 'Scope 2 Indirect', value: Number(scope2.toFixed(1)), unit: 'kg CO2e' },
        ],
      };
    },
  },
];
