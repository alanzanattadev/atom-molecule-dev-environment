"use babel";
// @flow

import LocalStager from "./LocalStager";
import RemoteSSHStager from "./RemoteSSHStager";
import IntegratedStager from "./IntegratedStager";

export default function getStager(type: string, config: ?mixed) {
  if (type == "local") return LocalStager(config);
  else if (type == "integrated") return IntegratedStager(config);
  else if (type == "remote") return RemoteSSHStager(config);
  else return null;
}
