import { memo, useMemo } from 'react'
import { Button } from '../Button'
import cls from './Pagination.module.scss'
import { Select, SelectOptions } from '../Select'
import { v4 } from 'uuid'

export type TPerPage = 10 | 20 | 50

interface IProps {
  total: number
  current: number
  disabled?: boolean
  perPage?: TPerPage
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: TPerPage) => void
}

const perPageOptions: SelectOptions<TPerPage>[] = [
  { value: 10, content: '10' },
  { value: 20, content: '20' },
  { value: 50, content: '50' },
]

export const Pagination = memo(
  ({
    total,
    current,
    perPage = 10,
    onPerPageChange,
    disabled = false,
    onPageChange,
  }: IProps) => {
    const renderPages = useMemo(() => {
      const pages = []
      pages.push(
        <Button
          key={v4()}
          className={cls.navBtn}
          outlined
          theme="secondary"
          disabled={disabled || current === 1}
          onClick={() => onPageChange(current - 1)}
        >
          {'<'}
        </Button>
      )
      if (total <= 6) {
        for (let i = 1; i <= total; i++) {
          pages.push(
            <Button
              disabled={disabled}
              outlined
              theme="secondary"
              key={v4()}
              onClick={() => onPageChange(i)}
              className={i === current ? cls.active : ''}
            >
              {i}
            </Button>
          )
        }
      } else {
        // 1,2,3, ..., last
        if (current <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(
              <Button
                disabled={disabled}
                outlined
                theme="secondary"
                key={v4()}
                onClick={() => onPageChange(i)}
                className={i === current ? cls.active : ''}
              >
                {i}
              </Button>
            )
          }
          pages.push(
            <span key={v4()} className={cls.dots}>
              ...
            </span>,
            <Button
              disabled={disabled}
              outlined
              theme="secondary"
              key={v4()}
              onClick={() => onPageChange(total)}
            >
              {total}
            </Button>
          )
        } else if (current >= total - 2) {
          // 1, ..., 98, 99, 100
          pages.push(
            <Button
              disabled={disabled}
              outlined
              theme="secondary"
              key={v4()}
              onClick={() => onPageChange(1)}
            >
              {1}
            </Button>,
            <span key={v4()} className={cls.dots}>
              ...
            </span>
          )
          for (let i = total - 4; i <= total; i++) {
            pages.push(
              <Button
                disabled={disabled}
                outlined
                theme="secondary"
                key={v4()}
                onClick={() => onPageChange(i)}
                className={i === current ? cls.active : ''}
              >
                {i}
              </Button>
            )
          }
        } else {
          // 1, ..., 50, 51, 52(current), 53, 54, ..., 100
          pages.push(
            <Button
              disabled={disabled}
              outlined
              theme="secondary"
              key={v4()}
              onClick={() => onPageChange(1)}
            >
              {1}
            </Button>,
            <span key={v4()} className={cls.dots}>
              ...
            </span>
          )
          for (let i = current - 2; i <= current + 2; i++) {
            pages.push(
              <Button
                disabled={disabled}
                outlined
                theme="secondary"
                key={v4()}
                onClick={() => onPageChange(i)}
                className={i === current ? cls.active : ''}
              >
                {i}
              </Button>
            )
          }
          pages.push(
            <span key={v4()} className={cls.dots}>
              ...
            </span>,
            <Button
              disabled={disabled}
              outlined
              theme="secondary"
              key={v4()}
              onClick={() => onPageChange(total)}
            >
              {total}
            </Button>
          )
        }
      }

      pages.push(
        <Button
          key={v4()}
          className={cls.navBtn}
          outlined
          theme="secondary"
          disabled={disabled || current === total}
          onClick={() => onPageChange(current + 1)}
        >
          {'>'}
        </Button>
      )
      return pages
    }, [total, current])

    return (
      <div className={`${cls.wrapper} ${total === 1 ? cls.hidden : ''}`}>
        <div className={cls.pagination}>{renderPages}</div>
        {onPerPageChange && (
          <Select<TPerPage>
            value={perPage}
            label={'Показывать по:'}
            onChange={onPerPageChange}
            options={perPageOptions}
          />
        )}
      </div>
    )
  }
)
