'use babel'
// @flow

import LocalStager from './LocalStager';
import RemoteSSHStager from './RemoteSSHStager';
import IntegratedStager from './IntegratedStager';

export default function getStager(type: string) {
  if (type == 'local')
    return LocalStager;
  else if (type == 'integrated')
    return IntegratedStager;
  else if (type == 'remote')
    return RemoteSSHStager;
  else
    return null;
}
