import { DestinationTypeEnums } from "../enums/enums-track-requests";

export class AddNewRequestTrackModel {
  name: string;
  actionOptions: number;
  requestCategoryId: string;
  parentRequestTemplateId: string;
  requestTemplateStepDtos: PostRequestPathStep[];

  constructor() {
    this.name = "";
    this.actionOptions = 0;
    this.requestCategoryId = "";
    this.parentRequestTemplateId = "";
    this.requestTemplateStepDtos = [];
  }
}

export class PostRequestPathStep {
  stepOrder: number;
  status: boolean;
  destinationType: DestinationTypeEnums;
  destinationId: string;
  alternativeCategoryId?: string;
  slaId: string;
  roleId: string;
  determinException?: any;
  exceptionActionTacker?: [];
  actionAssgin?: number;
  countTask?: number;
  isCountTask?: boolean;
  isSlaVisbale?: number;
  availableforClosing?: string;

  constructor(
    stepOrder: number,
    status: boolean,
    destinationType: DestinationTypeEnums,
    destinationId: string,
    alternativeCategoryId: string,
    slaId: string,
    roleId: string,
    determinException?: any,
    exceptionActionTacker?: [],
    isSlaVisbale?: number,
    actionAssgin?: number,
    availableforClosing?: string,
    countTask?: number,
    isCountTask?: boolean
  ) {
    this.stepOrder = stepOrder;
    this.status = status;
    this.destinationType = destinationType;
    this.destinationId = destinationId;
    this.alternativeCategoryId = alternativeCategoryId;
    this.slaId = slaId;
    this.roleId = roleId;
    this.determinException = determinException;
    this.exceptionActionTacker = exceptionActionTacker;
    this.actionAssgin = actionAssgin;
    this.countTask = countTask;
    this.isCountTask = isCountTask;
    this.isSlaVisbale = isSlaVisbale;
    this.availableforClosing = availableforClosing;
  }
}
