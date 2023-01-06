import React from 'react'
import {Spin, SpinProps} from 'antd'

export const Loading: React.FC<{active: boolean} & SpinProps> = ({
    active,
    ...restProps
}) => {
    if (active) return <Spin {...restProps} />
    else return <>{restProps.children}</>
}
