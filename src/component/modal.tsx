import cx from 'classnames'
import React from 'react'

export default function Modal({
  children,
  className = '',
  width = 540,
  padding = true,
  active = false,
  setActive = function (_e: any) {},
  ...props
}: any): JSX.Element {
  return (
    <div
      onClick={(_e) => {
        if (active) {
          setActive(false)
        } else {
          setActive(true)
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          setActive(false)
        }
      }}
      className={cx(`Modal`, {
        active: active
      })}
      {...props}
    >
      <div className='flex' style={{ maxHeight: '90vh' }}>
        <Card
          onClick={(e: any) => {
            // stop the card being closed when we click on inner divs
            if (active) {
              e.stopPropagation()
            }
          }}
          padding={padding}
          className={`overflow-hidden `}
          style={{ maxWidth: width, width: '100%' }}
        >
          {children}
        </Card>
      </div>
    </div>
  )
}

function Card({
  children,
  padding = true,
  className = '',
  style = {},
  onClick = (_: any) => {}
}: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cx('Card rounded shadow bg-white mx-auto my-auto', {
        'p-4': padding
      })}
    >
      {children}
    </div>
  )
}
