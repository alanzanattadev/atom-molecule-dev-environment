"use babel";
// @flow

import {
  selectCacheBlobsOfTask,
  selectCacheBlobsOfStep
} from "../Selectors/CacheBlobs";
import { addCacheBlob } from "../Actions/AddCacheBlob";
import type { CacheBlob } from "../Types/types.js.flow";
import { selectTaskOfID } from "../../TaskExecutionFeature/Selectors/Tasks";
import {
  selectTasksReducer,
  selectCacheBlobsReducer
} from "../../../GlobalSystem/Selectors";
import moment from "moment";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { List } from 'immutable';

export default function getCacheAPI(
  taskId: string,
  getState: () => State,
  dispatch: (action: any) => void
) {
  return {
    get(
      {
        step = null,
        excludeNullStep = true
      }: { step?: ?number, excludeNullStep?: boolean } = {}
    ): List<CacheBlob> {
      let blobs = selectCacheBlobsOfTask(
        selectCacheBlobsReducer(getState()),
        taskId
      );
      return step
        ? selectCacheBlobsOfStep(blobs, step, { excludeNull: excludeNullStep })
        : blobs;
    },
    push(data: any, step: ?boolean = false): void {
      dispatch(
        addCacheBlob({
          data: data,
          step: step == true
            ? selectTaskOfID(selectTasksReducer(getState()), taskId).step
            : null,
          taskId: taskId,
          time: moment().unix()
        })
      );
    }
  };
}
