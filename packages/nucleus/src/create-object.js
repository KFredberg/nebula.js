import populateData from './populator';

import './components/Style.scss';

export default function create({
  type,
  version,
  fields,
}, optional, context) {
  const t = context.nebbie.types.fetch(type, version);
  return t.initialProperties(optional.properties)
    .then(mergedProps => t.supernova().then((sn) => {
      if (fields) {
        populateData({
          sn,
          properties: mergedProps,
          fields,
        }, context);
      }

      return context.app.createSessionObject(mergedProps)
        .then(model => context.nebbie.get({
          id: model.id,
        }, { ...optional, properties: {} }));
    }));
}
