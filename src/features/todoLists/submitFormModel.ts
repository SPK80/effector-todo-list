import {createApi, createDomain, forward, sample, Effect} from 'effector'

export const createSubmitFormModel = (
    name: string,
    effect: Effect<string, any>,
) => {
    const domain = createDomain(name)
    const $title = domain.createStore('')

    const {submit, change, reset} = createApi($title, {
        change: (_, title: string) => title,
        submit: (state) => state,
        reset: () => '',
    })

    sample({
        clock: submit,
        source: $title,
        target: effect,
    })

    forward({
        from: effect.doneData,
        to: reset,
    })

    return {$title, change, submit}
}
