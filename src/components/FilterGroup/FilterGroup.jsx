import './FilterGroup.css'

export default function FilterGroup({ title, inputType = 'checkbox', name, options = [], selected, onChange }) {
  const isChecked = (value) => (Array.isArray(selected) ? selected.includes(value) : selected === value)

  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>
      {options.map((option) => {
        const value = option.value ?? option.text // `value` é opcional
        return (
          <label key={value} className="filter-group__option">
            <input
              type={inputType}
              name={name}
              value={value}
              checked={isChecked(value)}
              onChange={() => onChange?.(value)}
            />
            <span>{option.text}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
