/* eslint-disable react/require-default-props */
import React from 'react'
import styles from './EditInput.module.scss'

interface EditInputProps {
  prefix?: string
  placeholder?: string
  max?: number
  value?: string
  onChange?: (e: string) => void
}

export const EditInput = ({
  prefix,
  placeholder,
  max,
  value,
  onChange,
}: EditInputProps) => {
  return (
    <div className={`text-white my-6 form-input ${styles.container}`}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <input
        className="my-6"
        type="text"
        maxLength={max}
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
      />
    </div>
  )
}
