import actionTypes from 'actions';

const defaultState = {
  data: {
    title: '',
    slug: '',
    state: 'draft'
  },
  isSlugValid: false,
  errors: 'Not found'
};

export default function schemaEntryReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeSchemaEntryToDefault:
      return Object.assign({}, state, defaultState);
    case actionTypes.changeSchemaEntryFields:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.values)
      });
    case actionTypes.changeSchemaEntryProperty:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          properties: Object.assign({}, state.data.properties, {
            [action.key]: action.value
          })
        })
      });
    case actionTypes.graphql:
      if (action.data.schemaEntry) {
        return Object.assign({}, state, {
          data: Object.assign({}, state.data, action.data.schemaEntry),
          errors: action.errors
        });
      }
      return state;
    case actionTypes.updateSchemaEntry:
      return Object.assign({}, state, {
        data: action.data.updateSchemaEntry || state.data,
        errors: action.errors
      });
    case actionTypes.addSchemaEntry:
      return Object.assign({}, state, {
        data: action.data.addSchemaEntry || state.data,
        errors: action.errors
      });
    case actionTypes.restoreSchemaEntry:
      return Object.assign({}, state, {
        data: action.data.restoreSchemaEntry || state.data,
        errors: action.errors
      });
    case actionTypes.validateSchemaEntrySlug:
      return Object.assign({}, state, {
        isSlugValid: action.data.validateSchemaEntrySlug,
        errors: action.errors
      });
    default:
      return state;
  }
}
