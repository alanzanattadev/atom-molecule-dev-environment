"use babel";
// @flow

import {
  selectCacheBlobsOfStep,
  selectCacheBlobsOfTask,
} from "../Selectors/CacheBlobs";
import { addCacheBlob } from "../Actions/AddCacheBlob";
import { selectTaskOfID } from "../../TaskExecutionFeature/Selectors/Tasks";
import {
  selectCacheBlobsReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import moment from "moment";
import type { State } from "../../../GlobalSystem/types";
import type { CacheAPI } from "../Types/types";

export default function getCacheAPI(
  taskId: string,
  getState: () => State,
  dispatch: (action: any) => void,
): CacheAPI {
  return {
    get: (config = { step: null, excludeNullStep: true }) => {
      let blobs = selectCacheBlobsOfTask(
        selectCacheBlobsReducer(getState()),
        taskId,
      );
      return config.step
        ? selectCacheBlobsOfStep(blobs, config.step, {
            excludeNull: config.excludeNullStep,
          })
        : blobs;
    },
    push: (data, step = false) => {
      let task = selectTaskOfID(selectTasksReducer(getState()), taskId);
      dispatch(
        addCacheBlob({
          data: data,
          step: step === true && task != null ? task.step : null,
          taskId: taskId,
          time: moment().unix(),
        }),
      );
    },
  };
}
