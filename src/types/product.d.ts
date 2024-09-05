type Product = {
  id: number;
  title: string;
  body_html?: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix?: string;
  published_scope: string;
  tags: string;
  status: "active" | "draft" | "archived";
  admin_graphql_api_id: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image?: Image;
};

type Variant = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  position: number;
  inventory_policy: string;
  compare_at_price?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode?: string;
  fulfillment_service: string;
  grams: number;
  inventory_management?: string;
  requires_shipping: boolean;
  sku: string;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  admin_graphql_api_id: string;
  image_id?: number;
};

type Option = {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
};

type Image = {
  id: number;
  src: string;
  alt?: string;
  created_at: string;
  updated_at: string;
};
