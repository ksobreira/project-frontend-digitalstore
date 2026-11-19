# Projeto Final Front-end FullStack Geração Tech 4.0: Digital Store (Drip Store)

Loja virtual de tênis desenvolvida como **projeto final de Front-end** do Digital College. A aplicação segue a documentação oficial do curso e o design do Figma (versão mobile de 375px), e foi adaptada também para desktop (1440px).

**Equipe:** Kauam Sobreira 

---

## Sumário

1. [Funcionalidades](#1-funcionalidades)
2. [Páginas e rotas](#2-páginas-e-rotas)
3. [Tecnologias](#3-tecnologias)
4. [Como rodar o projeto](#4-como-rodar-o-projeto)
5. [Estrutura de pastas](#5-estrutura-de-pastas)
6. [Como o código funciona](#6-como-o-código-funciona)
7. [Autenticação (login e cadastro)](#7-autenticação-login-e-cadastro)
8. [Responsividade e design](#8-responsividade-e-design)
9. [Requisitos mínimos do projeto](#9-requisitos-mínimos-do-projeto)
---

## 1. Funcionalidades

- **Home** com galeria de destaques (slides com setas e indicadores), coleções em destaque e produtos em alta.
- **Listagem de produtos** com busca, filtros (marca, categoria, gênero e estado) e ordenação por preço.
- **Página do produto** com galeria de fotos e miniaturas, escolha de tamanho e cor e lista de produtos recomendados.
- **Categorias**: cada categoria abre a listagem já filtrada.
- **Cadastro e login** com validação de formulário e sessão salva no navegador.
- **Menu lateral e painel de filtros** no celular.

## 2. Páginas e rotas

| Endereço | Página | Observação |
|---|---|---|
| `/` | Home | |
| `/produtos` e `/products` | Listagem de produtos | As duas abrem a mesma tela: o menu usa `/produtos` e a busca do header usa `/products?filter=` |
| `/produtos?categoria=Casual` | Listagem filtrada | Vem da página de Categorias |
| `/product/:id` | Visualização do produto | Id inexistente mostra "Produto não encontrado" |
| `/categorias` | Categorias | |
| `/login` | Login | |
| `/cadastro` | Cadastro | |
| `/meus-pedidos`, `/about`, `/security`, `/wishlist`, `/blog`, `/jobs` | Página "em construção" | |
| qualquer outro endereço | "Página não encontrada" | |

## 3. Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 (JavaScript) | Interface, componentes e estado (`useState`, `useEffect`, `useMemo`, Context API) |
| Vite 5 | Servidor de desenvolvimento e build |
| React Router DOM 6 | Rotas, `NavLink`, `useParams`, `useSearchParams`, `useNavigate` |
| CSS puro | Um arquivo por componente, com variáveis CSS (`:root`) para as cores |
| Fonte Inter | Mesma fonte do Figma (Google Fonts) |

Nenhuma biblioteca de estilo foi usada.

## 4. Como rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
# 1. clonar o repositório
git clone <URL-DO-SEU-REPOSITORIO>
cd project-frontend-digitalstore

# 2. instalar as dependências
npm install

# 3. rodar em modo de desenvolvimento
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # serve a versão de produção localmente
```

## 5. Estrutura de pastas

```
project-frontend-digitalstore/
├── index.html                      entrada HTML (fonte Inter, lang="pt-BR")
├── vite.config.js
├── package.json
├── public/                         imagens (slides, coleções, fotos de produtos)
└── src/
    ├── main.jsx                    monta o React com BrowserRouter e AuthProvider
    ├── App.jsx                     tabela de rotas
    ├── styles/global.css           cores, reset, .container, .sr-only
    ├── assets/                     SVGs (logos, ícones, setas, redes sociais)
    ├── utils/format.js             formatBRL() e normalize()
    ├── data/product.js             12 produtos de exemplo + grupos de filtro
    ├── context/AuthContext.jsx     cadastro, login e logout
    ├── components/
    │   ├── Logo/            Section/         ProductCard/     ProductListing/
    │   ├── Gallery/         FilterGroup/     ProductOptions/  BuyBox/
    │   ├── Header/          Footer/          FooterInfo/      ScrollToTop/
    │   └── Icons.jsx
    └── pages/
        ├── Layout.jsx              Header + conteúdo + Footer
        ├── HomePage/  ProductListingPage/  ProductViewPage/  CategoriesPage/
        ├── LoginPage/  CadastroPage/  Auth/  (moldura e estilos de login e cadastro)
        └── InfoPage/               páginas "em construção" e 404
```

Regra seguida: `components/` guarda peças reutilizáveis; `pages/` só **compõe** componentes e guarda o estado de cada tela.

## 6. Como o código funciona

### Base

- **`main.jsx`** — renderiza `<App />` dentro de `<BrowserRouter>` (habilita as rotas) e de `<AuthProvider>` (disponibiliza o usuário logado para toda a aplicação).
- **`App.jsx`** — define as rotas com `<Routes>`. Os links sem conteúdo ficam numa lista (`infoPages`) que gera as rotas automaticamente com `map`.
- **`global.css`** — variáveis de cor (`--primary`, `--secondary`, `--tertiary`, `--error`, `--success`, `--warning` e a escala de cinzas), reset, foco visível, classe `.container` (largura máxima de 1240px) e respeito à preferência de "reduzir movimento" do sistema.
- **`utils/format.js`** — `formatBRL(149.9)` devolve `"R$ 149,90"`; `normalize()` remove acentos e maiúsculas para que a busca ache "tenis" em "Tênis".
- **`data/product.js`** — monta 12 produtos a partir de uma tabela com `map`. A primeira foto da galeria de cada produto é a mesma foto do card. Também exporta `filterGroups`, que alimenta o painel de filtros.

### Componentes

| Componente | O que faz |
|---|---|
| `Logo` | Imagem da logo. `variant="header"` (rosa) ou `"footer"` (branca); tamanho padrão 253×44. |
| `Section` | Bloco de seção: `title`, `titleAlign` (`left` ou `center`), `link {text, href}` opcional e `children`. |
| `ProductCard` | Card do produto. Com `priceDiscount`, mostra o preço antigo riscado, o novo em destaque e o selo "X% OFF" calculado. Com `id`, o card inteiro vira link para `/product/:id`. |
| `ProductListing` | Recebe `products` e desenha os cards numa grade (4 colunas no desktop, 3 no tablet e 2 no celular). Mostra "Nenhum produto encontrado." quando a lista é vazia. |
| `Gallery` | Slider de imagens. O estado `current` guarda a imagem atual e o deslocamento usa `translateX`. As setas ficam desabilitadas na primeira e na última imagem. Props: `images`, `width`, `height`, `radius`, `showThumbs` (miniaturas) e `showDots` (indicadores). |
| `FilterGroup` | Grupo de caixas de seleção ou botões de opção. É controlado: o estado fica na página. |
| `ProductOptions` | Opções do produto, em quadrado (tamanhos) ou círculo (cores). Guarda a opção escolhida e destaca com borda rosa. |
| `BuyBox` | Nome, referência, nota, preços, descrição e botão **COMPRAR**. As variações entram por `children`. |
| `Header` | Logo, busca, links de acesso, carrinho e navegação. No celular vira menu lateral com a busca em barra própria. Mostra "Cadastre-se / Entrar" ou, logado, "Olá, Nome" e **Sair**. |
| `Footer` e `FooterInfo` | Rodapé escuro com logo, redes sociais, colunas de links (geradas por `map`), contato e ano atual. |
| `ScrollToTop` | Volta a página ao topo a cada troca de rota. |
| `Icons` | Ícones em SVG (menu, fechar, lupa, filtro). |

### Páginas

- **`Layout`** — moldura comum: `Header` + conteúdo + `Footer`.
- **`HomePage`** — `Gallery` de 8 slides, "Coleções em destaque" (3 imagens) e "Produtos em alta" (8 produtos).
- **`ProductListingPage`** — lê o termo da busca (`?filter=`) e a categoria (`?categoria=`) com `useSearchParams`. Um `useMemo` aplica busca, filtros e ordenação:
  - **dentro** de um mesmo grupo vale OU (Nike ou Puma);
  - **entre** grupos vale E (Nike e Masculino);
  - a ordenação por preço usa o preço final (com desconto, quando houver).

  O título mostra a contagem: `Resultados para "nike" - 3 produtos`.
- **`ProductViewPage`** — `useParams` pega o `id`, mostra breadcrumb, galeria, caixa de compra e produtos recomendados.
- **`CategoriesPage`** — cartões com as categorias reais dos produtos. Cada um leva para `/produtos?categoria=...`.
- **`InfoPage`** — página simples reutilizada para links "em construção" e para o 404.

## 7. Autenticação (login e cadastro)

O projeto é só front-end, então o login é uma **simulação** feita no navegador (`localStorage`), sem servidor.

- **Cadastro** valida: CPF com 11 números, telefone com DDD (10 ou 11 dígitos), senha com no mínimo 6 caracteres e confirmação de senha igual. Não permite dois cadastros com o mesmo e-mail.
- **Login** compara e-mail e senha; em caso de erro mostra a mesma mensagem para e-mail inexistente e senha errada, sem revelar qual dos dois falhou.
- **Sessão** fica salva (`drip-session`) e sobrevive ao recarregar a página. O botão **Sair** a remove.
- **Senha** nunca é salva em texto puro: guarda-se apenas o hash SHA-256 (`drip-users`).

> **Aviso:** isso serve para demonstrar o fluxo no front-end. Segurança de verdade exige um back-end com banco de dados e tokens.

Telas de login e cadastro compartilham a mesma moldura (`pages/Auth/AuthLayout.jsx`) e os mesmos estilos (`Auth.css`, todas as classes com prefixo `auth` para não colidir com o CSS global).

## 8. Responsividade e design

- **Pontos de quebra:** 900px (menu e filtros viram painéis laterais, rodapé em 2 colunas) e 600px (grade de produtos em 2 colunas e rodapé compacto). Login e cadastro trocam de layout em 992px.
- **Fidelidade ao Figma:** cores, tamanhos de fonte, botões, selos de desconto, cards e o menu e filtros laterais seguem o design mobile; o desktop segue a documentação.
- **Acessibilidade:** botões com `aria-label`, campos com `label`, foco visível, mensagens de erro com `role="alert"` e respeito a "reduzir movimento".

## 9. Requisitos mínimos do projeto

| Requisito da documentação | Situação |
|---|---|
| Layout com Header, conteúdo e Footer | ✅ |
| Header: logo, busca (lupa e Enter), Cadastre-se, Entrar, carrinho e navegação com item ativo | ✅ |
| Footer: fundo escuro, logo branca, redes sociais, `FooterInfo`, `<hr />` e © com ano atual | ✅ |
| Componentes `Section`, `ProductCard`, `ProductListing` e `Gallery` | ✅ |
| Home: galeria, coleções e produtos em alta | ✅ |
| Listagem: ordenação, filtros e contagem dinâmica | ✅ |
| Produto: galeria, `BuyBox`, `ProductOptions` e recomendados, rota `/product/:id` | ✅ |


Projeto desenvolvido por Kauam Sobreira para o Digital College.