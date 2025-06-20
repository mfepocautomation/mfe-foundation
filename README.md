# ACME Foundation Packages

Este repositório contém pacotes independentes que podem ser usados em qualquer projeto.

## Pacotes Disponíveis

### @acme/components
Componentes React reutilizáveis.

**Instalação:**
```bash
npm install @acme/components
```

**Uso:**
```tsx
import { Navbar, PrefetchCrossZoneLinks } from '@acme/components'

// Usar o Navbar
<Navbar isDocsApp={false} />

// Usar o PrefetchCrossZoneLinks
<PrefetchCrossZoneLinks hrefs={['/docs', '/about']} />
```

### @acme/design-system
Sistema de design com componentes base e configuração do Tailwind.

**Instalação:**
```bash
npm install @acme/design-system
```

**Uso:**
```tsx
import { Button } from '@acme/design-system'

// Configurar Tailwind (se necessário)
import '@acme/design-system/tailwind'
```

### @acme/utils
Utilitários e funções auxiliares.

**Instalação:**
```bash
npm install @acme/utils
```

**Uso:**
```tsx
import { formatDate, validateEmail } from '@acme/utils'
```

### eslint-config-acme
Configuração do ESLint para projetos ACME.

**Instalação:**
```bash
npm install eslint-config-acme
```

**Uso:**
```json
// .eslintrc.json
{
  "extends": ["eslint-config-acme"]
}
```

## Desenvolvimento

Para desenvolver localmente:

1. Clone o repositório
2. Navegue para o pacote desejado: `cd mfe-foundation/[nome-do-pacote]`
3. Instale as dependências: `npm install`
4. Execute o build: `npm run build`
5. Para desenvolvimento com watch: `npm run dev`

## Publicação

Cada pacote pode ser publicado independentemente no npm:

```bash
cd mfe-foundation/[nome-do-pacote]
npm publish
```

## Estrutura

```
mfe-foundation/
├── acme-components/     # Componentes React
├── acme-design-system/  # Sistema de design
├── acme-utils/         # Utilitários
└── eslint-config-acme/ # Configuração ESLint
```

Cada pacote é completamente independente e pode ser usado em qualquer projeto sem dependências entre si.
