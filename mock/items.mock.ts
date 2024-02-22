import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

// self-increase ID
let id = 0
const createId = () => {
    id += 1
    return id
}

// create one Item
const create = (attrs?: Partial<Item>): Item => {
    return {
        id: createId(),
        user_id: 1,
        amount: faker.datatype.number({ min: 99, max: 1000_00 }),
        tag_ids: [1, 2],
        happen_at: faker.date.past().toISOString(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
        kind: 'expenses',
        ...attrs
    }
}

// create n items
const createList = (n: number, attrs?: Partial<Item>): Item[] => {
    return Array.from({ length: n }).map(() => create(attrs))
}

// create n items and put it in the resources and add a pager
const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>,): Resources<Item> => {
    return {
        resources: createList(perPage, attrs),
        pager: {
            page,
            per_page: perPage,
            count
        }
    }
}

export const itemsMock: MockMethod = {
    url: '/api/v1/items',
    method: 'get',
    statusCode: 200,
    response: ({ query }: ResponseParams): Resources<Item> =>
        createResponse({ count: 100, perPage: 10, page: parseInt(query.page) })
    ,
}
