import { AnySrvRecord } from "dns";

export class requestTamplateByIdModel {
  name: string;
  categoryName: string;
  parentName: string;
  categoryId: string;
  parentId: string;
  requestCategoryTypeName: string;
  requestCategoryTypeId: string;
  pathCount: number;
  requestTemplateStepDtos: requestTemplateStepDtosModel[];

  constructor() {
    this.name = "";
    this.categoryName = "";
    this.parentName = "";
    this.categoryId = "";
    this.parentId = "";
    this.requestCategoryTypeName = "";
    this.requestCategoryTypeId = "";
    this.pathCount = 0;
    this.requestTemplateStepDtos = [];
  }
}

export class requestTemplateStepDtosModel {
  stepNumber: number;
  slaId: string;
  slaName: string;
  implementationDays: number;
  implementationHours: number;
  implementationMinutes: number;
  actionTakerId: string;
  alternativeCategoryId?: string;
  actionTackerType: number;
  roleId: string;
  actionTackerName: string;
  roleName: string;
  type: number;
  exceptionActionTackers?: [];
  determinException?: number;
  isExceptionActionTacker?: any;
  isCountTask?: boolean;
  countTask?: any;
  assginRequestTemplateStepDto?: any;
  isSlaVisbale?: number;
  availableforClosing?: string;
  constructor(
    stepNumber: number,
    slaId: string,
    slaName: string,
    implementationDays: number,
    implementationHours: number,
    implementationMinutes: number,
    actionTakerId: string,
    alternativeCategoryId: string,
    actionTackerType: number,
    roleId: string,
    actionTackerName: string,
    roleName: string,
    type: number,
    determinException?: number,
    exceptionActionTackers?: [],
    isExceptionActionTacker?: any,
    isCountTask?: boolean,
    countTask?: any,
    assginRequestTemplateStepDto?: any,
    isSlaVisbale?: number,
    availableforClosing?: string
  ) {
    this.stepNumber = stepNumber;
    this.slaId = slaId;
    this.slaName = slaName;
    this.implementationDays = implementationDays;
    this.implementationHours = implementationHours;
    this.implementationMinutes = implementationMinutes;
    this.actionTakerId = actionTakerId;
    this.alternativeCategoryId = alternativeCategoryId;
    this.actionTackerType = actionTackerType;
    this.roleId = roleId;
    this.actionTackerName = actionTackerName;
    this.roleName = roleName;
    this.type = type;
    this.isExceptionActionTacker = isExceptionActionTacker;
    this.exceptionActionTackers = exceptionActionTackers;
    this.countTask = countTask;
    this.isCountTask = isCountTask;
    this.assginRequestTemplateStepDto = assginRequestTemplateStepDto;
    this.isSlaVisbale = isSlaVisbale;
    this.availableforClosing = availableforClosing;
  }
}
