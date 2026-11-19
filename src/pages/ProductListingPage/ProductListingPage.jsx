import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../Layout'
import Section from '../../components/Section/Section'
import ProductListing from '../../components/ProductListing/ProductListing'
import FilterGroup from '../../components/FilterGroup/FilterGroup'
import { FilterIcon, CloseIcon } from '../../components/Icons'
import { products, filterGroups } from '../../data/product'
import { normalize } from '../../utils/format'
import './ProductListingPage.css'

const emptyFilters = { brand: [], category: [], gender: [], state: '' }
const finalPrice = (p) => p.priceDiscount ?? p.price

export default function ProductListingPage() {
  const [params] = useSearchParams()
  const term = (params.get('filter') ?? '').trim() // vem de /products?filter=...
  const [sort, setSort] = useState('relevance')
  const [filters, setFilters] = useState(emptyFilters)
  const [panelOpen, setPanelOpen] = useState(false)

  const handleChange = (group, inputType, value) =>
    setFilters((prev) => {
      if (inputType === 'radio') return { ...prev, [group]: value }
      const list = prev[group]
      return { ...prev, [group]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] }
    })

  const result = useMemo(() => {
    const t = normalize(term)
    const list = products.filter((p) => {
      const matchesTerm = !t || normalize(`${p.name} ${p.brand} ${p.type} ${p.category}`).includes(t)
      const inList = (key) => filters[key].length === 0 || filters[key].includes(p[key])
      const stateOk = !filters.state || p.state === filters.state
      return matchesTerm && inList('brand') && inList('category') && inList('gender') && stateOk
    })
    if (sort === 'asc') list.sort((a, b) => finalPrice(a) - finalPrice(b))
    if (sort === 'desc') list.sort((a, b) => finalPrice(b) - finalPrice(a))
    return list
  }, [term, filters, sort])

  const count = `${result.length} ${result.length === 1 ? 'produto' : 'produtos'}`
  const title = term ? `Resultados para "${term}" - ${count}` : count

  return (
    <Layout>
      <div className="container listing">
        <aside className={`listing__side${panelOpen ? ' listing__side--open' : ''}`}>
          <div className="sort">
            <label htmlFor="sort">Ordenar por:</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="relevance">Mais relevantes</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </div>

          <button type="button" className="listing__filter-btn" onClick={() => setPanelOpen(true)} aria-label="Abrir filtros">
            <FilterIcon />
          </button>

          <div className="filters">
            <div className="filters__head">
              <h2>Filtrar por</h2>
              <button type="button" className="filters__close" onClick={() => setPanelOpen(false)} aria-label="Fechar filtros"><CloseIcon /></button>
            </div>
            <hr />
            {filterGroups.map((group) => (
              <FilterGroup
                key={group.key}
                name={group.key}
                title={group.title}
                inputType={group.inputType}
                options={group.options}
                selected={filters[group.key]}
                onChange={(value) => handleChange(group.key, group.inputType, value)}
              />
            ))}
            <button type="button" className="filters__clear" onClick={() => setFilters(emptyFilters)}>Limpar filtros</button>
          </div>
          {panelOpen && <div className="filters__overlay" onClick={() => setPanelOpen(false)} />}
        </aside>

        <div className="listing__content">
          <Section title={title} titleAlign="left">
            <ProductListing products={result} />
          </Section>
        </div>
      </div>
    </Layout>
  )
}
