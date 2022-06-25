/* eslint-disable camelcase */
import { rest } from 'msw';
import cars from './mock_data.json';

const getInfo = () => {
  return {
    add_columns: [
      {
        description: '',
        name: 'brand',
        label: 'Brand',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        name: 'model',
        label: 'Model',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        name: 'date',
        label: 'Date',
        required: false,
        type: 'Date',
        unique: false,
      },
      {
        description: '',
        name: 'weight',
        label: 'Weight',
        required: false,
        type: 'Float',
        unique: false,
      },
      {
        description: '',
        name: 'electric',
        label: 'Electric',
        required: false,
        type: 'Boolean',
        unique: false,
      },
      {
        description: '',
        name: 'datetime',
        label: 'DateTime',
        required: false,
        type: 'DateTime',
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
        name: 'brand',
        label: 'Brand',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        name: 'model',
        label: 'Model',
        required: false,
        type: 'String',
        unique: false,
      },
      {
        description: '',
        name: 'date',
        label: 'Date',
        required: false,
        type: 'Date',
        unique: false,
      },
      {
        description: '',
        name: 'weight',
        label: 'Weight',
        required: false,
        type: 'Float',
        unique: false,
      },
      {
        description: '',
        name: 'electric',
        label: 'Electric',
        required: false,
        type: 'Boolean',
        unique: false,
      },
      {
        description: '',
        name: 'datetime',
        label: 'DateTime',
        required: false,
        type: 'DateTime',
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
      datetime: {
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
          label: 'DateTime',
          name: 'datetime',
          required: false,
          type: 'DateTime',
          unique: false,
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
    list_columns: ['brand', 'model', 'date', 'datetime', 'year'],
    list_title: 'List Cars',
    order_columns: ['brand', 'model', 'date'],
    result: cars,
  };
};

const getItem = (id) => {
  let item = cars.find((car) => car.id == id);

  return {
    show_title: 'Show Cars',
    description_columns: {},
    show_columns: ['brand', 'model', 'date', 'year'],
    label_columns: { brand: 'Brand', model: 'Model', date: 'Date', weight: 'Weight' },
    id: item.id,
    result: item,
  };
};

const getEngines = () => {
  return {
    count: 0,
    ids: [],
    label_columns: { brand: 'Brand', model: 'Model', date: 'Date', weight: 'Weight' },
    list_columns: ['brand', 'model', 'date', 'year'],
    list_title: 'List Engine',
    order_columns: ['brand', 'model', 'date'],
    result: cars,
  };
};

const getUser = () => {
  return {
    last_name: 'ade',
    created_on: '2022-05-03T12:14:54.059252',
    username: 'admin',
    changed_on: '2022-05-03T12:14:54.059257',
    roles: [{ name: 'Admin', id: 1 }],
    email: 'admin@fab.org',
    last_login: '2022-06-21T11:50:06.607826',
    first_name: 'admin',
    active: true,
    login_count: 96,
    fail_login_count: 0,
    permissions: [
      'OpenApi',
      'MenuApi',
      'AuthApi',
      'UsersApi',
      'RolesApi',
      'PermissionsApi',
      'ViewsMenusApi',
      'PermissionViewApi',
    ],
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
    return res(ctx.json(getItem(req.params.id)), ctx.delay());
  }),
  rest.post('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)), ctx.delay());
  }),
  rest.delete('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)), ctx.delay());
  }),
  rest.delete('/cars/:id', (req, res, ctx) => {
    return res(ctx.json(getItem(req.params.id)), ctx.delay());
  }),
  rest.get('/engines/_info', (req, res, ctx) => {
    return res(ctx.json(getInfo()), ctx.delay());
  }),
  rest.get('/engines/', (req, res, ctx) => {
    return res(ctx.json(getEngines()), ctx.delay());
  }),
  rest.post('/auth/login', (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
      return res(ctx.json(getUser()), ctx.delay());
    } else {
      res(
        ctx.status(403),
        ctx.delay(),
        ctx.json({
          errorMessage: `User '${username} not found or ${password} invalid!`,
        }),
      );
    }
  }),
];
