import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Solution,
  type ServiceCategory,
} from "@shared/schema";
import { randomUUID } from "crypto";
import solutionsData from "@shared/solutions-data.json";
import servicesData from "@shared/services-data.json";
import productsData from "@shared/products-data.json";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;

  // Solution operations
  getSolutions(): Promise<Solution[]>;
  getSolution(id: string): Promise<Solution | undefined>;

  // Service operations
  getServices(): Promise<ServiceCategory[]>;
  getService(id: string): Promise<ServiceCategory | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private solutions: Solution[];
  private services: ServiceCategory[];

  constructor() {
    this.users = new Map();
    this.products = new Map();
    
    // Load solutions and services from JSON
    this.solutions = solutionsData as Solution[];
    this.services = servicesData as ServiceCategory[];
    
    // Load products from JSON and populate Map
    const loadedProducts = productsData as unknown as Product[];
    loadedProducts.forEach((product) => {
      this.products.set(product.id, product);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  // Solution operations
  async getSolutions(): Promise<Solution[]> {
    return this.solutions;
  }

  async getSolution(id: string): Promise<Solution | undefined> {
    return this.solutions.find((solution) => solution.id === id);
  }

  // Service operations
  async getServices(): Promise<ServiceCategory[]> {
    return this.services;
  }

  async getService(id: string): Promise<ServiceCategory | undefined> {
    return this.services.find((service) => service.id === id);
  }
}

export const storage = new MemStorage();
