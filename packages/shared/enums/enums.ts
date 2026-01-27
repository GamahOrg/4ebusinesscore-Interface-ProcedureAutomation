export enum RequestStatus {
  idle,
  loading,
  succeeded,
  failed,
}

export enum ResponseStatus {
  FailedToSave,
  SavedSuccessfully,
  Exception,
  Success,
  Failed,
  FailedToFindTheObject,
  AlreadyExisting,
}


export enum StatusENum {
  Draft = 1,
  Published = 2,
}

export enum State {
  NotDeleted,
  Deleted
}
