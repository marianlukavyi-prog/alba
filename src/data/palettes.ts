import type { PaletteKey, ProductColor } from './products-types'

const ALUPROF_COLORS = '/figma/products/aluprof/colors'

const SK_SP: ProductColor[] = [
  { name: '00 — Unpainted', image: `${ALUPROF_COLORS}/00-nielakierowane.jpg` },
  { name: '01 — Silver', image: `${ALUPROF_COLORS}/01_srebrny_0.jpg` },
  { name: '02 — White', image: `${ALUPROF_COLORS}/02_bialy.jpg` },
  { name: '03 — Grey', image: `${ALUPROF_COLORS}/03_szary.jpg` },
  { name: '04 — Dark beige', image: `${ALUPROF_COLORS}/04_ciemno_bezowy.jpg` },
  { name: '05 — Beige', image: `${ALUPROF_COLORS}/05_bezowy.jpg` },
  { name: '06 — Wood-dark', image: `${ALUPROF_COLORS}/06_ciemne_drewno.jpg` },
  { name: '07 — Good-light', image: `${ALUPROF_COLORS}/07_jasne_drewno.jpg` },
  { name: '08 — Dark brown', image: `${ALUPROF_COLORS}/08_ciemnobrazowy.jpg` },
  { name: '09 — Brown', image: `${ALUPROF_COLORS}/09_brazowy.jpg` },
  { name: '11 — Yellow', image: `${ALUPROF_COLORS}/11_zolty.jpg` },
  { name: '12 — Red', image: `${ALUPROF_COLORS}/12_czerwony.jpg` },
  { name: '13 — Green', image: `${ALUPROF_COLORS}/13_zielony.jpg` },
  { name: '15 — Cream white', image: `${ALUPROF_COLORS}/15_biel_kremowa.jpg` },
  { name: '16 — Ivory', image: `${ALUPROF_COLORS}/16_kosc_sloniowa.jpg` },
  { name: '17 — Fir green', image: `${ALUPROF_COLORS}/17_zielen_jodlowa.jpg` },
  { name: '18 — Steel blue', image: `${ALUPROF_COLORS}/18_stalowy_niebieski.jpg` },
  { name: '19 — Bordeau', image: `${ALUPROF_COLORS}/19_bordowy.jpg` },
  { name: '20 — Black', image: `${ALUPROF_COLORS}/20_czarny.jpg` },
  { name: '22 — Ultra white', image: `${ALUPROF_COLORS}/22_ultra_bialy.jpg` },
  { name: '23 — Anthracite grey', image: `${ALUPROF_COLORS}/23_szary_antracyt.jpg` },
  { name: '26 — Mahogany', image: `${ALUPROF_COLORS}/26_mahon.jpg` },
  { name: '28 — Nut', image: `${ALUPROF_COLORS}/28_orzech.jpg` },
  { name: '30 — Golden Oak', image: `${ALUPROF_COLORS}/30_zloty_dab.jpg` },
  { name: '31 — Light grey', image: `${ALUPROF_COLORS}/31_jasny_szary.jpg` },
  { name: '33 — Basalt grey', image: `${ALUPROF_COLORS}/33_bazaltowy_szary.jpg` },
  { name: '34 — Quartz grey', image: `${ALUPROF_COLORS}/34_kwarcowy_szary.jpg` },
  { name: '35 — Concrete gray', image: `${ALUPROF_COLORS}/35_betonowy_szary.jpg` },
  { name: '36 — Wenge', image: `${ALUPROF_COLORS}/36_wenge.jpg` },
  { name: '37 — Grey aluminum', image: `${ALUPROF_COLORS}/37_szare_aluminium.jpg` },
  { name: '38 — Frozen grey', image: `${ALUPROF_COLORS}/38-mrozny-szary.jpg` },
  { name: '39 — Satin grey', image: `${ALUPROF_COLORS}/39-satynowy-szary_0.jpg` },
  { name: '40 — White, pearl mat', image: `${ALUPROF_COLORS}/40_bialy-perlowy-mat.jpg` },
  { name: '41 — Light grey, pearl mat', image: `${ALUPROF_COLORS}/41_jasny-szary-perlowy-mat.jpg` },
  { name: '42 — Grey, pearl mat', image: `${ALUPROF_COLORS}/42_szary-perlowy-mat.jpg` },
  { name: '43 — Anthracite grey, pearl mat', image: `${ALUPROF_COLORS}/43_szary-antracyt-perlowy-mat.jpg` },
  { name: '44 — Dark grey, pearl mat', image: `${ALUPROF_COLORS}/44_ciemny-szary-perlowy-mat.jpg` },
  { name: '71 — Chartwell green', image: `${ALUPROF_COLORS}/71_zielony-chartwell.jpg` },
  { name: '75 — Metallic grey', image: `${ALUPROF_COLORS}/75_szary_metaliczny.jpg` },
  { name: '79 — Light oak', image: `${ALUPROF_COLORS}/79_jasny_dab.jpg` },
]

const SKT_SKB: ProductColor[] = SK_SP.filter(
  (c) =>
    !c.name.startsWith('41 ') && !c.name.startsWith('42 ') && !c.name.startsWith('44 '),
)

const RAL: ProductColor[] = [
  { name: 'RAL 7016 — Anthracite grey', image: `${ALUPROF_COLORS}/06-ral-7016-szary-antracyt_0.jpg` },
  { name: 'RAL 9007 — Grey aluminum', image: `${ALUPROF_COLORS}/ral_9007_0.jpg` },
  { name: 'RAL 9006 — Silver', image: `${ALUPROF_COLORS}/ral_9006_0.jpg` },
  { name: 'RAL 9005 — Black', image: `${ALUPROF_COLORS}/04-ral-9005-czarny_0.jpg` },
  { name: 'RAL 9001 — Cream white', image: `${ALUPROF_COLORS}/ral_9001_0.jpg` },
  { name: 'RAL 8019 — Dark brown', image: `${ALUPROF_COLORS}/ral_8019_0.png` },
  { name: 'RAL 8014 — Brown', image: `${ALUPROF_COLORS}/ral_8014_0.jpg` },
  { name: 'RAL 7039 — Quartz grey', image: `${ALUPROF_COLORS}/ral_7039_0.jpg` },
  { name: 'RAL 7024 — Graphite grey', image: `${ALUPROF_COLORS}/ral_7024_0.jpg` },
  { name: 'RAL 9016 — Ultra white', image: `${ALUPROF_COLORS}/05-ral-9016-ultra-bialy_m_0.jpg` },
]

const PERGOLA: ProductColor[] = [
  { name: 'R 319 — Anthracite grey, pearl', image: `${ALUPROF_COLORS}/x44-ciemny-szary-perlowy-mat_0.jpg` },
  { name: 'RAL 7016 — Anthracite grey', image: `${ALUPROF_COLORS}/06-ral-7016-szary-antracyt_0.jpg` },
  { name: 'RAL 7024 — Graphite grey', image: `${ALUPROF_COLORS}/ral_7024_0.jpg` },
  { name: 'RAL 7035 — Light grey', image: `${ALUPROF_COLORS}/09-ral-7035-jasny-szary_0.jpg` },
  { name: 'RAL 8019 — Dark brown', image: `${ALUPROF_COLORS}/ral_8019_0.png` },
  { name: 'RAL 9005 — Black', image: `${ALUPROF_COLORS}/04-ral-9005-czarny_0.jpg` },
  { name: 'RAL 9006 — Silver', image: `${ALUPROF_COLORS}/ral_9006_0.jpg` },
  { name: 'RAL 9007 — Grey aluminum', image: `${ALUPROF_COLORS}/ral_9007_0.jpg` },
  { name: 'RAL 9016 — Ultra white', image: `${ALUPROF_COLORS}/05-ral-9016-ultra-bialy_m_0.jpg` },
]

export const PALETTES: Record<PaletteKey, ProductColor[]> = {
  SK_SP,
  SKT_SKB,
  RAL,
  PERGOLA,
}
