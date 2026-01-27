class SubSystemSettingsModel {
  id: string;
  noteNameAr: string;
  noteNameEn: string;
  description: string;
  icon: string;
  color: number | string;
  state: number;
  isActive: boolean;
  noteTypeId: string;
  organizationHierarchyId: string;
  mainNameAr: string;
  mainNameEn: string;
  url: string;
  isExternal: boolean;
  isExternalComponent: boolean;
  isSinglSignOn: boolean;
  identityProvider: string;
  clientId: string;
  clientSecret: string;
  squence: number;
  subsytemMainLookupId: string;
  subsytemMainLookupNameAr: string;
  subsytemMainLookupNameEn: string;
  subsystemIsVisiable: boolean;
  isComponent: boolean;
  workspaceKey: number;
  parentId: string;
  ssoSecuritySettingId: string;
  ssoSecuritySettingName: string;
  ssoSecuritySettingUrl: string;
  ssoSecuritySettingBody: string;
  ssoSecuritySettingType: string;
  subsystemmainSequnce: number;

  constructor(
    id: string = "",
    noteNameAr: string = "",
    noteNameEn: string = "",
    description: string = "",
    icon: string = "",
    color: number | string = "",
    state: number = 0,
    isActive: boolean = false,
    noteTypeId: string = "",
    organizationHierarchyId: string = "",
    mainNameAr: string = "",
    mainNameEn: string = "",
    url: string = "",
    isExternal: boolean = false,
    isExternalComponent: boolean = false,
    isSinglSignOn: boolean = false,
    identityProvider: string = "",
    clientId: string = "",
    clientSecret: string = "",
    squence: number = 0,
    subsytemMainLookupId: string = "",
    subsytemMainLookupNameAr: string = "",
    subsytemMainLookupNameEn: string = "",
    subsystemIsVisiable: boolean = false,
    isComponent: boolean = false,
    workspaceKey: number = 0,
    parentId: string = "",
    ssoSecuritySettingId: string = "",
    ssoSecuritySettingName: string = "",
    ssoSecuritySettingUrl: string = "",
    ssoSecuritySettingBody: string = "",
    ssoSecuritySettingType: string = "",
    subsystemmainSequnce: number = 0
  ) {
    this.id = id;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.state = state;
    this.isActive = isActive;
    this.noteTypeId = noteTypeId;
    this.organizationHierarchyId = organizationHierarchyId;
    this.mainNameAr = mainNameAr;
    this.mainNameEn = mainNameEn;
    this.url = url;
    this.isExternal = isExternal;
    this.isExternalComponent = isExternalComponent;
    this.isSinglSignOn = isSinglSignOn;
    this.identityProvider = identityProvider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.squence = squence;
    this.subsytemMainLookupId = subsytemMainLookupId;
    this.subsytemMainLookupNameAr = subsytemMainLookupNameAr;
    this.subsytemMainLookupNameEn = subsytemMainLookupNameEn;
    this.subsystemIsVisiable = subsystemIsVisiable;
    this.isComponent = isComponent;
    this.workspaceKey = workspaceKey;
    this.parentId = parentId;
    this.ssoSecuritySettingId = ssoSecuritySettingId;
    this.ssoSecuritySettingName = ssoSecuritySettingName;
    this.ssoSecuritySettingUrl = ssoSecuritySettingUrl;
    this.ssoSecuritySettingBody = ssoSecuritySettingBody;
    this.ssoSecuritySettingType = ssoSecuritySettingType;
    this.subsystemmainSequnce = subsystemmainSequnce;
  }
}

export default SubSystemSettingsModel;
