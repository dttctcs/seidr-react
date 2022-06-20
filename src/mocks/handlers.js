import { rest } from 'msw';
import cars from './mock_data.json';

const getInfo = () => {
  return {
    add_columns: [
      {
        description: '',
        label: 'brand',
        name: 'Brand',
        required: false,
        type: 'Float',
        unique: false,
      },
      {
        description: '',
        label: 'model',
        name: 'Model',
        required: false,
        type: 'Float',
        unique: false,
      },
      {
        description: '',
        label: 'date',
        name: 'Date',
        required: false,
        type: 'Date',
        unique: false,
      },
      {
        description: '',
        label: 'weight',
        name: 'Weight',
        required: false,
        type: 'Float',
        unique: false,
      },
    ],
    add_title: 'Add Car',
    schema: {
      type: 'object',
      _whitelist: {
        list: {},
        refs: {},
      },
      _blacklist: {
        list: {},
        refs: {},
      },
      exclusiveTests: {},
      deps: [],
      conditions: [],
      tests: [],
      transforms: [null],
      spec: {
        strip: false,
        strict: false,
        abortEarly: true,
        recursive: true,
        nullable: false,
        presence: 'optional',
      },
      fields: {
        brand: {
          type: 'string',
          _whitelist: {
            list: {},
            refs: {},
          },
          _blacklist: {
            list: {},
            refs: {},
          },
          exclusiveTests: {},
          deps: [],
          conditions: [],
          tests: [],
          transforms: [null],
          spec: {
            strip: false,
            strict: false,
            abortEarly: true,
            recursive: true,
            nullable: true,
            presence: 'optional',
          },
        },
        model: {
          type: 'string',
          _whitelist: {
            list: {},
            refs: {},
          },
          _blacklist: {
            list: {},
            refs: {},
          },
          exclusiveTests: {},
          deps: [],
          conditions: [],
          tests: [],
          transforms: [null],
          spec: {
            strip: false,
            strict: false,
            abortEarly: true,
            recursive: true,
            nullable: true,
            presence: 'optional',
          },
        },
        date: {
          type: 'string',
          _whitelist: {
            list: {},
            refs: {},
          },
          _blacklist: {
            list: {},
            refs: {},
          },
          exclusiveTests: {},
          deps: [],
          conditions: [],
          tests: [],
          transforms: [null],
          spec: {
            strip: false,
            strict: false,
            abortEarly: true,
            recursive: true,
            nullable: true,
            presence: 'optional',
          },
        },
        weight: {
          type: 'number',
          _whitelist: {
            list: {},
            refs: {},
          },
          _blacklist: {
            list: {},
            refs: {},
          },
          exclusiveTests: {},
          deps: [],
          conditions: [],
          tests: [],
          transforms: [null],
          spec: {
            strip: false,
            strict: false,
            abortEarly: true,
            recursive: true,
            nullable: true,
            presence: 'optional',
          },
        },
      },
      _nodes: ['brand', 'model', 'date', 'weight'],
      _excludedEdges: [],
    },

    edit_columns: [
      {
        description: '',
        label: 'brand',
        name: 'Brand',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        label: 'model',
        name: 'Model',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        label: 'date',
        name: 'Date',
        required: false,
        type: 'Date',
        unique: false,
      },
      {
        description: '',
        label: 'weight',
        name: 'Weight',
        required: false,
        type: 'Float',
        unique: false,
      },
    ],

    edit_title: 'Edit Car',

    filters: {
      brand: {
        filters: [
          {
            name: 'Starts with',
            operator: 'sw',
          },
          {
            name: 'Ends with',
            operator: 'ew',
          },
          {
            name: 'Contains',
            operator: 'ct',
          },
          {
            name: 'Equal to',
            operator: 'eq',
          },
          {
            name: 'Not Starts with',
            operator: 'nsw',
          },
          {
            name: 'Not Ends with',
            operator: 'new',
          },
          {
            name: 'Not Contains',
            operator: 'nct',
          },
          {
            name: 'Not Equal to',
            operator: 'neq',
          },
          {
            name: 'One of',
            operator: 'in',
          },
        ],
        schema: {
          description: '',
          label: 'Brand',
          name: 'brand',
          required: false,
          type: 'String',
          unique: false,
          validate: ['<Length(min=None, max=32, equal=None, error=None)>'],
        },
      },
      model: {
        filters: [
          {
            name: 'Starts with',
            operator: 'sw',
          },
          {
            name: 'Ends with',
            operator: 'ew',
          },
          {
            name: 'Contains',
            operator: 'ct',
          },
          {
            name: 'Equal to',
            operator: 'eq',
          },
          {
            name: 'Not Starts with',
            operator: 'nsw',
          },
          {
            name: 'Not Ends with',
            operator: 'new',
          },
          {
            name: 'Not Contains',
            operator: 'nct',
          },
          {
            name: 'Not Equal to',
            operator: 'neq',
          },
          {
            name: 'One of',
            operator: 'in',
          },
        ],
        schema: {
          description: '',
          label: 'Brand',
          name: 'brand',
          required: false,
          type: 'String',
          unique: false,
          validate: ['<Length(min=None, max=32, equal=None, error=None)>'],
        },
      },
      date: {
        filters: [
          {
            name: 'Equal to',
            operator: 'eq',
          },
          {
            name: 'Greater than',
            operator: 'gt',
          },
          {
            name: 'Smaller than',
            operator: 'lt',
          },
          {
            name: 'Not Equal to',
            operator: 'neq',
          },
          {
            name: 'Smaller equal',
            operator: 'le',
          },
          {
            name: 'Greater equal',
            operator: 'ge',
          },
        ],
        schema: {
          description: '',
          label: 'Date',
          name: 'date',
          required: false,
          type: 'Date',
          unique: false,
        },
      },
      LE_Flight_Nr: {
        filters: [
          {
            name: 'Equal to',
            operator: 'eq',
          },
          {
            name: 'Greater than',
            operator: 'gt',
          },
          {
            name: 'Smaller than',
            operator: 'lt',
          },
          {
            name: 'Not Equal to',
            operator: 'neq',
          },
          {
            name: 'Smaller equal',
            operator: 'le',
          },
          {
            name: 'Greater equal',
            operator: 'ge',
          },
        ],
        schema: {
          description: '',
          label: 'Weight',
          name: 'weight',
          required: false,
          type: 'Float',
          unique: false,
        },
      },
    },
    permissions: ['can_get', 'can_info', 'can_put', 'can_delete', 'can_post'],
    relations: [
      {
        foreign_key: 'id',
        name: 'Engine',
        path: 'engine/',
        type: 'rel_o_m',
      },
    ],
  };
};

const get = () => {
  return {
    count: cars.length,
    ids: cars.map((car) => car.id),
    label_columns: { brand: 'Brand', model: 'Model', date: 'Date', weight: 'Weight' },
    list_columns: ['brand', 'model', 'date', 'year'],
    list_title: 'List Cars',
    order_columns: ['brand', 'model', 'date', 'year'],
    result: cars,
  };
};

const getItem = (id) => {
  let item = cars.find((car) => car.id == id);

  return {
    show_title: 'Show Flight Summary',
    description_columns: {},
    show_columns: ['brand', 'model', 'date', 'year'],
    label_columns: { brand: 'Brand', model: 'Model', date: 'Date', weight: 'Weight' },
    id: item.id,
    result: item,
  };
};

export const handlers = [
  rest.get('/cars/_info', (req, res, ctx) => {
    return res(ctx.json(getInfo()));
  }),
  rest.get('/cars', (req, res, ctx) => {
    return res(ctx.json(get()));
  }),
  rest.get('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)));
  }),
  rest.post('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)));
  }),
  rest.delete('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)));
  }),
  rest.delete('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)));
  }),
];
