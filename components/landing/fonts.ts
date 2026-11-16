import { Bricolage_Grotesque, Sora, Geist_Mono } from 'next/font/google'

// Tipografías de la marca (Exploración 2.0): Bricolage Grotesque para
// titulares, Sora para texto e interfaz, Geist Mono para datos y etiquetas.
// Las usa la landing (y su vista previa en el panel); el panel conserva las
// suyas desde app/layout.tsx.

// Variable con eje de tamaño óptico (opsz): a tamaño display se dibuja más
// apretada y con más carácter que los pesos estáticos.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
})
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sora',
  display: 'swap',
})
// Variable: con pesos fijos Google la sirve con URLs sin extensión y el
// loader de next/font 15.5 falla en el build.
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

/** Clases que declaran las variables --font-* en el elemento raíz. */
export const brandFontVars = `${bricolage.variable} ${sora.variable} ${geistMono.variable}`
