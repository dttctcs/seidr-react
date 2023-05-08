import { rest } from 'msw';
import assets from './assets.json';
import units from './units.json';

export const handlers = [
  rest.get('/api/v1/info', (req, res, ctx) => {
    return res(ctx.json(getSeidrInfo()), ctx.delay());
  }),
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    const { username, password } = req.json();
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

  rest.get('/api/v1/units/_info', (req, res, ctx) => {
    return res(ctx.json(getInfoUnits()));
  }),
  rest.get('/api/v1/units', (req, res, ctx) => {
    return res(ctx.json(getUnits()));
  }),
  rest.get('/api/v1/units/:id', (req, res, ctx) => {
    return res(ctx.json(getUnit(req.params.id)), ctx.delay());
  }),
  rest.post('/api/v1/units/:id', (req, res, ctx) => {
    return res(ctx.json(getUnit(req.params.id)), ctx.delay());
  }),
  rest.delete('/api/v1/units/:id', (req, res, ctx) => {
    return res(ctx.json(getUnit(req.params.id)), ctx.delay());
  }),

  rest.get('/api/v1/assets/_info', (req, res, ctx) => {
    return res(ctx.json(getInfoAssets()));
  }),
  rest.get('/api/v1/assets', (req, res, ctx) => {
    return res(ctx.json(getAssets()));
  }),
  rest.get('/api/v1/assets/:id', (req, res, ctx) => {
    return res(ctx.json(getAsset(req.params.id)), ctx.delay());
  }),
  rest.post('/api/v1/assets/:id', (req, res, ctx) => {
    return res(ctx.json(getAsset(req.params.id)), ctx.delay());
  }),
  rest.delete('/api/v1/assets/:id', (req, res, ctx) => {
    return res(ctx.json(getAsset(req.params.id)), ctx.delay());
  }),
];

const getSeidrInfo = () => {
  return {
    'apis': [
      {
        'icon': 'Table',
        'level': 'security',
        'name': 'Permissionview',
        'path': 'permissionviews',
        'permission_name': 'PermissionViewApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'security',
        'name': 'Permissions',
        'path': 'permissions',
        'permission_name': 'PermissionsApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'security',
        'name': 'Roles',
        'path': 'roles',
        'permission_name': 'RolesApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'security',
        'name': 'Users',
        'path': 'users',
        'permission_name': 'UsersApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'security',
        'name': 'Viewsmenus',
        'path': 'viewsmenus',
        'permission_name': 'ViewsMenusApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'default',
        'name': 'Assets',
        'path': 'assets',
        'permission_name': 'AssetApi',
        'type': 'table',
      },
      {
        'icon': 'Table',
        'level': 'default',
        'name': 'Units',
        'path': 'units',
        'permission_name': 'UnitApi',
        'type': 'table',
      },
    ],
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

const getInfoUnits = () => {
  return {
    'add_columns': [
      {
        'description': 'Name of the unit',
        'label': 'Name',
        'name': 'name',
        'required': true,
        'type': 'String',
        'unique': false,
        'validate': [
          '<Length(min=None, max=512, equal=None, error=None)>',
        ],
      },
      {
        'count': 300,
        'description': '',
        'label': 'Owner',
        'name': 'owner',
        'required': false,
        'type': 'RelatedList',
        'unique': false,
        'values': [
          {
            'id': 1,
            'value': 'asset_0',
          },
          {
            'id': 2,
            'value': 'asset_1',
          },
          {
            'id': 3,
            'value': 'asset_2',
          },
          {
            'id': 4,
            'value': 'asset_3',
          },
          {
            'id': 5,
            'value': 'asset_4',
          },
          {
            'id': 6,
            'value': 'asset_5',
          },
          {
            'id': 7,
            'value': 'asset_6',
          },
          {
            'id': 8,
            'value': 'asset_7',
          },
          {
            'id': 9,
            'value': 'asset_8',
          },
          {
            'id': 10,
            'value': 'asset_9',
          },
          {
            'id': 11,
            'value': 'asset_10',
          },
          {
            'id': 12,
            'value': 'asset_11',
          },
          {
            'id': 13,
            'value': 'asset_12',
          },
          {
            'id': 14,
            'value': 'asset_13',
          },
          {
            'id': 15,
            'value': 'asset_14',
          },
          {
            'id': 16,
            'value': 'asset_15',
          },
          {
            'id': 17,
            'value': 'asset_16',
          },
          {
            'id': 18,
            'value': 'asset_17',
          },
          {
            'id': 19,
            'value': 'asset_18',
          },
          {
            'id': 20,
            'value': 'asset_19',
          },
        ],
      },
    ],
    'add_title': 'Add Unit',
    'edit_columns': [
      {
        'description': 'Name of the unit',
        'label': 'Name',
        'name': 'name',
        'required': true,
        'type': 'String',
        'unique': false,
        'validate': [
          '<Length(min=None, max=512, equal=None, error=None)>',
        ],
      },
      {
        'count': 300,
        'description': '',
        'label': 'Owner',
        'name': 'owner',
        'required': false,
        'type': 'RelatedList',
        'unique': false,
        'values': [
          {
            'id': 1,
            'value': 'asset_0',
          },
          {
            'id': 2,
            'value': 'asset_1',
          },
          {
            'id': 3,
            'value': 'asset_2',
          },
          {
            'id': 4,
            'value': 'asset_3',
          },
          {
            'id': 5,
            'value': 'asset_4',
          },
          {
            'id': 6,
            'value': 'asset_5',
          },
          {
            'id': 7,
            'value': 'asset_6',
          },
          {
            'id': 8,
            'value': 'asset_7',
          },
          {
            'id': 9,
            'value': 'asset_8',
          },
          {
            'id': 10,
            'value': 'asset_9',
          },
          {
            'id': 11,
            'value': 'asset_10',
          },
          {
            'id': 12,
            'value': 'asset_11',
          },
          {
            'id': 13,
            'value': 'asset_12',
          },
          {
            'id': 14,
            'value': 'asset_13',
          },
          {
            'id': 15,
            'value': 'asset_14',
          },
          {
            'id': 16,
            'value': 'asset_15',
          },
          {
            'id': 17,
            'value': 'asset_16',
          },
          {
            'id': 18,
            'value': 'asset_17',
          },
          {
            'id': 19,
            'value': 'asset_18',
          },
          {
            'id': 20,
            'value': 'asset_19',
          },
        ],
      },
    ],
    'edit_title': 'Edit Unit',
    'filters': {
      'name': {
        'filters': [
          {
            'name': 'Starts with',
            'operator': 'sw',
          },
          {
            'name': 'Ends with',
            'operator': 'ew',
          },
          {
            'name': 'Contains',
            'operator': 'ct',
          },
          {
            'name': 'Equal to',
            'operator': 'eq',
          },
          {
            'name': 'Not Starts with',
            'operator': 'nsw',
          },
          {
            'name': 'Not Ends with',
            'operator': 'new',
          },
          {
            'name': 'Not Contains',
            'operator': 'nct',
          },
          {
            'name': 'Not Equal to',
            'operator': 'neq',
          },
          {
            'name': 'One of',
            'operator': 'in',
          },
        ],
        'label': 'Name',
        'schema': {
          'description': 'Name of the unit',
          'label': 'Name',
          'name': 'name',
          'required': true,
          'type': 'String',
          'unique': false,
          'validate': [
            '<Length(min=None, max=512, equal=None, error=None)>',
          ],
        },
      },
      'owner': {
        'filters': [
          {
            'name': 'Relation as Many',
            'operator': 'rel_m_m',
          },
        ],
        'label': 'Owner',
        'schema': {
          'count': 300,
          'description': '',
          'label': 'Owner',
          'name': 'owner',
          'required': false,
          'type': 'RelatedList',
          'unique': false,
          'values': [
            {
              'id': 1,
              'value': 'asset_0',
            },
            {
              'id': 2,
              'value': 'asset_1',
            },
            {
              'id': 3,
              'value': 'asset_2',
            },
            {
              'id': 4,
              'value': 'asset_3',
            },
            {
              'id': 5,
              'value': 'asset_4',
            },
            {
              'id': 6,
              'value': 'asset_5',
            },
            {
              'id': 7,
              'value': 'asset_6',
            },
            {
              'id': 8,
              'value': 'asset_7',
            },
            {
              'id': 9,
              'value': 'asset_8',
            },
            {
              'id': 10,
              'value': 'asset_9',
            },
            {
              'id': 11,
              'value': 'asset_10',
            },
            {
              'id': 12,
              'value': 'asset_11',
            },
            {
              'id': 13,
              'value': 'asset_12',
            },
            {
              'id': 14,
              'value': 'asset_13',
            },
            {
              'id': 15,
              'value': 'asset_14',
            },
            {
              'id': 16,
              'value': 'asset_15',
            },
            {
              'id': 17,
              'value': 'asset_16',
            },
            {
              'id': 18,
              'value': 'asset_17',
            },
            {
              'id': 19,
              'value': 'asset_18',
            },
            {
              'id': 20,
              'value': 'asset_19',
            },
          ],
        },
      },
    },
    'permissions': [
      'can_put',
      'can_post',
      'can_get',
      'can_info',
      'can_delete',
    ],
    'quickfilters': [
      {
        'column': 'name',
        'label': 'Unit Name',
        'name': 'unit_name',
        'options': [
          {
            'label': 'unit_0',
            'value': 'unit_0',
          },
          {
            'label': 'unit_1',
            'value': 'unit_1',
          },
          {
            'label': 'unit_2',
            'value': 'unit_2',
          },
          {
            'label': 'unit_3',
            'value': 'unit_3',
          },
          {
            'label': 'unit_4',
            'value': 'unit_4',
          },
          {
            'label': 'unit_5',
            'value': 'unit_5',
          },
          {
            'label': 'unit_6',
            'value': 'unit_6',
          },
          {
            'label': 'unit_7',
            'value': 'unit_7',
          },
          {
            'label': 'unit_8',
            'value': 'unit_8',
          },
          {
            'label': 'unit_9',
            'value': 'unit_9',
          },
        ],
        'type': 'multiselect',
      },
    ],
    'relations': [],
  };
};
const getInfoAssets = () => {
  return {
    'add_columns': [
      {
        'count': 50,
        'description': 'Owner of the asset',
        'label': 'Owner',
        'name': 'owner',
        'required': false,
        'type': 'Related',
        'unique': false,
        'values': [
          {
            'id': 1,
            'value': 'unit_0',
          },
          {
            'id': 2,
            'value': 'unit_1',
          },
          {
            'id': 3,
            'value': 'unit_2',
          },
          {
            'id': 4,
            'value': 'unit_3',
          },
          {
            'id': 5,
            'value': 'unit_4',
          },
          {
            'id': 6,
            'value': 'unit_5',
          },
          {
            'id': 7,
            'value': 'unit_6',
          },
          {
            'id': 8,
            'value': 'unit_7',
          },
          {
            'id': 9,
            'value': 'unit_8',
          },
          {
            'id': 10,
            'value': 'unit_9',
          },
          {
            'id': 11,
            'value': 'unit_0',
          },
          {
            'id': 12,
            'value': 'unit_1',
          },
          {
            'id': 13,
            'value': 'unit_2',
          },
          {
            'id': 14,
            'value': 'unit_3',
          },
          {
            'id': 15,
            'value': 'unit_4',
          },
          {
            'id': 16,
            'value': 'unit_5',
          },
          {
            'id': 17,
            'value': 'unit_6',
          },
          {
            'id': 18,
            'value': 'unit_7',
          },
          {
            'id': 19,
            'value': 'unit_8',
          },
          {
            'id': 20,
            'value': 'unit_9',
          },
        ],
      },
      {
        'description': 'Name of the asset',
        'label': 'Name',
        'name': 'name',
        'required': true,
        'type': 'String',
        'unique': false,
        'validate': [
          '<Length(min=None, max=512, equal=None, error=None)>',
        ],
      },
    ],
    'add_title': 'Add Asset',
    'edit_columns': [
      {
        'count': 50,
        'description': 'Owner of the asset',
        'label': 'Owner',
        'name': 'owner',
        'required': false,
        'type': 'Related',
        'unique': false,
        'values': [
          {
            'id': 1,
            'value': 'unit_0',
          },
          {
            'id': 2,
            'value': 'unit_1',
          },
          {
            'id': 3,
            'value': 'unit_2',
          },
          {
            'id': 4,
            'value': 'unit_3',
          },
          {
            'id': 5,
            'value': 'unit_4',
          },
          {
            'id': 6,
            'value': 'unit_5',
          },
          {
            'id': 7,
            'value': 'unit_6',
          },
          {
            'id': 8,
            'value': 'unit_7',
          },
          {
            'id': 9,
            'value': 'unit_8',
          },
          {
            'id': 10,
            'value': 'unit_9',
          },
          {
            'id': 11,
            'value': 'unit_0',
          },
          {
            'id': 12,
            'value': 'unit_1',
          },
          {
            'id': 13,
            'value': 'unit_2',
          },
          {
            'id': 14,
            'value': 'unit_3',
          },
          {
            'id': 15,
            'value': 'unit_4',
          },
          {
            'id': 16,
            'value': 'unit_5',
          },
          {
            'id': 17,
            'value': 'unit_6',
          },
          {
            'id': 18,
            'value': 'unit_7',
          },
          {
            'id': 19,
            'value': 'unit_8',
          },
          {
            'id': 20,
            'value': 'unit_9',
          },
        ],
      },
      {
        'description': 'Name of the asset',
        'label': 'Name',
        'name': 'name',
        'required': true,
        'type': 'String',
        'unique': false,
        'validate': [
          '<Length(min=None, max=512, equal=None, error=None)>',
        ],
      },
    ],
    'edit_title': 'Edit Asset',
    'filters': {
      'name': {
        'filters': [
          {
            'name': 'Starts with',
            'operator': 'sw',
          },
          {
            'name': 'Ends with',
            'operator': 'ew',
          },
          {
            'name': 'Contains',
            'operator': 'ct',
          },
          {
            'name': 'Equal to',
            'operator': 'eq',
          },
          {
            'name': 'Not Starts with',
            'operator': 'nsw',
          },
          {
            'name': 'Not Ends with',
            'operator': 'new',
          },
          {
            'name': 'Not Contains',
            'operator': 'nct',
          },
          {
            'name': 'Not Equal to',
            'operator': 'neq',
          },
          {
            'name': 'One of',
            'operator': 'in',
          },
        ],
        'label': 'Name',
        'schema': {
          'description': 'Name of the asset',
          'label': 'Name',
          'name': 'name',
          'required': true,
          'type': 'String',
          'unique': false,
          'validate': [
            '<Length(min=None, max=512, equal=None, error=None)>',
          ],
        },
      },
      'owner': {
        'filters': [
          {
            'name': 'Relation',
            'operator': 'rel_o_m',
          },
          {
            'name': 'No Relation',
            'operator': 'nrel_o_m',
          },
        ],
        'label': 'Owner',
        'schema': {
          'count': 50,
          'description': 'Owner of the asset',
          'label': 'Owner',
          'name': 'owner',
          'required': false,
          'type': 'Related',
          'unique': false,
          'values': [
            {
              'id': 1,
              'value': 'unit_0',
            },
            {
              'id': 2,
              'value': 'unit_1',
            },
            {
              'id': 3,
              'value': 'unit_2',
            },
            {
              'id': 4,
              'value': 'unit_3',
            },
            {
              'id': 5,
              'value': 'unit_4',
            },
            {
              'id': 6,
              'value': 'unit_5',
            },
            {
              'id': 7,
              'value': 'unit_6',
            },
            {
              'id': 8,
              'value': 'unit_7',
            },
            {
              'id': 9,
              'value': 'unit_8',
            },
            {
              'id': 10,
              'value': 'unit_9',
            },
            {
              'id': 11,
              'value': 'unit_0',
            },
            {
              'id': 12,
              'value': 'unit_1',
            },
            {
              'id': 13,
              'value': 'unit_2',
            },
            {
              'id': 14,
              'value': 'unit_3',
            },
            {
              'id': 15,
              'value': 'unit_4',
            },
            {
              'id': 16,
              'value': 'unit_5',
            },
            {
              'id': 17,
              'value': 'unit_6',
            },
            {
              'id': 18,
              'value': 'unit_7',
            },
            {
              'id': 19,
              'value': 'unit_8',
            },
            {
              'id': 20,
              'value': 'unit_9',
            },
          ],
        },
      },
    },
    'permissions': [
      'can_info',
      'can_delete',
      'can_get',
      'can_put',
      'can_post',
    ],
    'quickfilters': [
      {
        'column': 'name',
        'label': 'Asset Name',
        'name': 'asset_name',
        'options': [
          {
            'label': 'asset_0',
            'value': 'asset_0',
          },
          {
            'label': 'asset_1',
            'value': 'asset_1',
          },
          {
            'label': 'asset_2',
            'value': 'asset_2',
          },
          {
            'label': 'asset_3',
            'value': 'asset_3',
          },
          {
            'label': 'asset_4',
            'value': 'asset_4',
          },
          {
            'label': 'asset_5',
            'value': 'asset_5',
          },
          {
            'label': 'asset_6',
            'value': 'asset_6',
          },
          {
            'label': 'asset_7',
            'value': 'asset_7',
          },
          {
            'label': 'asset_8',
            'value': 'asset_8',
          },
          {
            'label': 'asset_9',
            'value': 'asset_9',
          },
        ],
        'type': 'multiselect',
      },
    ],
    'relations': [],
  };
};

const getUnits = () => {
  return {
    count: units.length,
    ids: units.map((car) => car.id),
    label_columns: { name: 'Name' },
    list_columns: ['name'],
    list_title: 'List units',
    order_columns: ['name'],
    result: units,
  };
};

const getAssets = () => {
  return {
    count: assets.length,
    ids: assets.map((asset) => asset.id),
    label_columns: { name: 'Name', owner: 'Owner' },
    list_columns: ['name', 'owner'],
    list_title: 'List assets',
    order_columns: ['name', 'owner'],
    result: assets,
  };
};

const getUnit = (id) => {
  let item = units.find((unit) => unit.id === id);

  return {
    show_title: 'Show unit',
    description_columns: {},
    show_columns: ['name'],
    label_columns: { name: 'Name' },
    id: item.id,
    result: item,
  };
};

const getAsset = (id) => {
  let item = assets.find((asset) => asset.id === id);

  return {
    show_title: 'Show asset',
    description_columns: {},
    show_columns: ['name', 'owner'],
    label_columns: { name: 'Name', owner: 'Owner' },
    id: item.id,
    result: item,
  };
};