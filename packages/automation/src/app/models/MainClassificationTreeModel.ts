export class MainClassificationTreeModel {
  id: string = "";
  name: string = "";
  orgId: string = "";
  admin: string = "";
  icon: string = "";
  color: string = "";
  description: string = "";
  serviceType: number = 0;
  teamName: string = "";
  serviceCatalogs: ServiceCatalog[] = [];
  catalogs: [] | undefined;
  requestFor: any;

  constructor(data?: Partial<MainClassificationTreeModel>) {
    Object.assign(this, data);
    this.serviceCatalogs = this.serviceCatalogs.map(
      (catalog) => new ServiceCatalog(catalog)
    );
  }
}

class ServiceCatalog {
  id: string = "";
  name: string = "";
  priority: number = 0;
  icon: string = "";
  color: string = "";
  description: string = "";
  serviceType: number = 0;
  teamName: string = "";
  categories: Category[] = [];

  constructor(data?: Partial<ServiceCatalog>) {
    Object.assign(this, data);
    this.categories = this.categories.map((category) => new Category(category));
  }
}

class Category {
  id: string = "";
  name: string = "";
  priority: number = 0;
  description: string = "";
  serviceType: number = 0;
  teamName: string = "";
  subCategories: SubCategory[] = [];
  items: Item[] = [];

  constructor(data?: Partial<Category>) {
    Object.assign(this, data);
    this.subCategories = this.subCategories.map(
      (subCategory) => new SubCategory(subCategory)
    );
    this.items = this.items.map((item) => new Item(item));
  }
}

class SubCategory {
  id: string = "";
  name: string = "";
  priority: number = 0;
  description: string = "";
  serviceType: number = 0;
  teamName: string = "";
  subCategories: SubCategory[] = [];
  items: Item[] = [];

  constructor(data?: Partial<SubCategory>) {
    Object.assign(this, data);
    this.subCategories = this.subCategories.map(
      (subCategory) => new SubCategory(subCategory)
    );
    this.items = this.items.map((item) => new Item(item));
  }
}

class Item {
  id: string = "";
  name: string = "";
  duration: number = 0;
  effect: number = 0;
  priorityLevel: number = 0;
  slaId: string = "";
  description: string = "";
  categoryId: string = "";

  constructor(data?: Partial<Item>) {
    Object.assign(this, data);
  }
}
