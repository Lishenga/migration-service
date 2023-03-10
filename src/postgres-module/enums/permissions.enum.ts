import { registerEnumType } from '@nestjs/graphql';

export enum PERMISSIONS {
  // Overwrite permissions instance contraints on certain users
  NOT_APPLICABLE = 'PermissionsNotApplicable',

  //Roles permissions
  CREATE_ROLE = 'createRole',
  DELETE_ROLE = 'deleteRole',
  UPDATE_ROLE = 'updateRole',
  GET_ALL_ROLES = 'getAllRoles',
  GET_SPECIFIC_ROLE = 'getSpecificRole',
  ASSIGN_ROLE_TO_USER = 'assignUserToRole',
  UPDATE_ASSIGNED_PERMISSION_TO_ROLE = 'updateAssignedPermissionToRole',
  DELETE_ROLE_PERMISSION = 'deleteRolePermission',

  //SubRoles permissions
  CREATE_SUBROLE = 'createSubRole',
  DELETE_SUBROLE = 'deleteSubRole',
  UPDATE_SUBROLE = 'updateSubRole',
  GET_ALL_SUBROLES = 'getAllSubRoles',
  GET_SPECIFIC_SUBROLE = 'getSpecificSubRole',
  ASSIGN_SUBROLE_TO_ROLE = 'assignSubRoleToRole',
  GET_SUBROLES_FOR_LOGINUSER_ROLE = 'getSubRolesForLoginUserRole',
  GET_PERMISSIONS_FOR_SUBROLE = 'getPermissionsForSubRole',

  // ovesadmin user permissions
  GET_SPECIFIC_OVESADMIN = 'getSpecificOvesAdmin',
  GET_ALL_OVESADMINS = 'getAllOvesAdmins',
  DELETE_OVES_ADMIN = 'deleteOvesAdmin',
  GENERATE_ROLE_USER_SIGN_UP_TOKEN = 'generateRoleUserSignUpToken',
  UPDATE_OVES_ADMIN = 'updateOvesAdmin',
  UPDATE_OVES_ADMIN_PASSWORD = 'updateOvesAdminPassword',

  //Login user permissions
  CREATE_LOGIN_USER = 'signUpLoginUser',
  DELETE_LOGIN_USER = 'deleteLoginUser',
  UPDATE_LOGIN_USER = 'updateLoginUser',
  GET_ALL_LOGIN_USERS = 'getAllLoginUsers',
  GET_SPECIFIC_LOGIN_USER = 'getSpecificLoginUser',
  GENERATE_USER_ROLE_SIGNUP_TOKEN = 'generateUserRoleSignUpToken',
  GENERATE_LOGIN_USER_SUBROLE_SIGNUP_TOKEN = 'generateLoginUserSubRoleSignUpToken',
  GET_ALL_SUBROLE_LOGINUSERS_FOR_ROLE_LOGINUSER = 'getAllSubRoleLoginUsersForRoleLoginUser',
  CHANGE_SUBROLE_LOGIN_USER_SUBROLE = 'changeSubRoleLoginUserSubRole',
  CHANGE_ROLE_LOGIN_USER_ASSIGN_PERMISSION_STATUS = 'changeRoleLoginUserAssignPermissionStatus',
  UPDATE_LOGINUSER_PASSWORD = 'updateLoginUserPassword',

  // Permissions
  CREATE_PERMISSION = 'createPermission',
  GET_ALL_PERMISSIONS = 'getAllPermissions',
  GET_SPECIFIC_PERMISSION = 'getSpecificPermission',
  ASSIGN_PERMISSION_TO_ROLE = 'assignPermissionToRole',
  ASSIGN_ROLE_PERMISSIONS_TO_SUBROLE = 'assignRolePermissionsToSubRole',
  ASSIGN_DEFAULT_LOGINUSER_PERMISSIONS_TO_SUBROLE = 'assignDefaultLoginUserPermissionsToSubRole',
  CREATE_MULTIPLE_SUBINSTANCES_UNDER_INSTANCE = 'createMultipleSubInstanceUnderInstance',
  GET_SPECIFIC_ROLE_PERMISSIONS = 'getSpecificRolePermissions',
  DELETE_SUBROLE_PERMISSIONS = 'deleteSubRolePermission',
  DELETE_PERMISSION = 'deletePermission',
  UPDATE_PERMISSION = 'updatePermission',
  UPDATE_ASSIGNED_ROLE_PERMISSIONS_TO_SUBROLE = 'updateAssignedRolePermissionsToSubRole',
  ADMIN_ASSIGN_PERMISSION_TO_SUBROLE = 'adminAssignPermissionToSubRole',

  // AuthenticationInstance permissions
  CREATE_AUTHENTICATION_INSTANCE = 'createAuthenticationInstance',
  DELETE_AUTHENTICATION_INSTANCE = 'deleteAuthenticationInstance',
  UPDATE_AUTHENTICATION_INSTANCE = 'updateAuthenticationInstance',
  GET_ALL_AUTHENTICATION_INSTANCE = 'getAllAuthenticationInstances',
  GET_SPECIFIC_AUTHENTICATION_INSTANCE = 'getSpecificAuthenticationInstance',
  MAKE_AUTHENTICATION_INSTANCE_ACTIVE = 'makeAuthenticationInstanceActive',
  CHANGE_LOGIN_USER_AUTHENTICATION_INSTANCE = 'changeLoginUserAuthenticationInstance',

  // AuthenticationSubInstance permissions
  CREATE_AUTHENTICATION_SUBINSTANCE = 'createAuthenticationSubInstance',
  UPDATE_AUTHENTICATION_SUBINSTANCE = 'updateAuthenticationSubInstance',
  DELETE_AUTHENTICATION_SUBINSTANCE = 'deleteAuthenticationSubInstance',
  GET_ALL_AUTHENTICATION_SUBINSTANCE = 'getAllAuthenticationSubInstances',
  GET_SPECIFIC_AUTHENTICATION_SUBINSTANCE = 'getSpecificAuthenticationSubInstance',
  MAKE_AUTHENTICATION_SUBINSTANCE_ACTIVE = 'makeAuthenticationSubInstanceActive',

  // Distributor permissions
  DEFAULT_PERMISSIONS = 'DefaultPermissions',

  // Ovesadmin permissions
  GET_SPECIFIC_OVES_ADMIN = 'getSpecificOvesAdmin',
  GET_ALL_OVES_ADMINS = 'getAllOvesAdmins',

  /*

        THING SERVICE PERMISSIONS

    */

  // Address permissions
  GET_ALL_ADDRESSES = 'getAllAddresses',
  GET_SPECIFIC_ADDRESS = 'getSpecificAddress',
  CREATE_ADDRESS = 'createAddress',
  UPDATE_ADDRESS = 'updateAddress',
  DELETE_ADDRESS = 'deleteAddress',

  // Articles permissions
  GET_ALL_ARTICLES = 'getAllArticles',
  GET_ALL_SPECIFIC_ARTICLE = 'getSpecificArticle',
  CREATE_ARTICLE = 'createArticle',
  UPDATE_ARTICLE = 'updateArticle',
  DELETE_ARTICLE = 'deleteArticle',

  // Avatars permissions
  GET_ALL_AVATARS = 'getAllAvatars',
  UPDATE_AVATAR_BY_ITEM_ID = 'updateAvatarByItemID',
  GET_SPECIFIC_AVATAR = 'getSpecificAvatar',
  GET_SPECIFIC_AVATAR_FOR_ITEM = 'getSpecificAvatarforItem',
  CREATE_AVATAR = 'createAvatar',
  UPDATE_AVATAR = 'updateAvatar',
  DELETE_AVATAR = 'deleteAvatar',

  //CodeEvents permissions
  GET_ALL_CODE_EVENTS = 'getAllCodeEvents',
  GET_SPECIFIC_CODE_EVENT = 'getSpecificCodeEvent',
  GENERATE_CODEGENERATOR = 'generateCodeGenerator',
  DELETE_CODEEVENT = 'deleteCodeEvent',
  GENERATE_DAYSCODE = 'generateDaysCode',
  GENERATE_FREESCODE = 'generateFreeCode',
  GENERATE_RESETCODE = 'generateResetCode',

  //Codegenerator permissions
  GET_ALL_CODEGENERATORS = 'getAllCodeGenerators',
  GET_SPECIFIC_CODEGENERATOR = 'getSpecificCodeGenerator',
  INITIALIZE_CODEGENERATOR = 'initializeCodeGen',
  DELETE_CODEGENERATOR = 'deleteCodeGenerator',

  // Codesystems permissions
  GET_ALL_CODE_SYSTEMS = 'getAllCodeSystems',
  GET_SPECIFIC_CODE_SYSTEM = 'getSpecificCodeSystem',

  // Dispatcher permissions
  GET_ALL_DISPATCHERS = 'getAllDispatchers',
  GET_SPECIFIC_DISPATCHER = 'getSpecificDispatcher',
  CREATE_DISPATCHER = 'createDispatcher',
  UPDATE_DISPATCHER = 'updateDispatcher',
  DELETE_DISPATCHER = 'deleteDispatcher',

  //Events permissions
  GET_ALL_EVENTS = 'getAllEvents',
  GET_SPECIFIC_EVENT = 'getSpecificEvent',
  CREATE_EVENT = 'createEvent',
  UPDATE_EVENT = 'updateEvent',
  DELETE_EVENT = 'deleteEvent',

  //Items permissions
  GET_ALL_ITEMS = 'getAllItems',
  GET_ALL_ITEMS_FOR_ITEMBATCH_IN_DESCENDING_ORDER = 'getAllItemsforItemBatchInDescendingOrder',
  GET_SPECIFIC_ITEM = 'getSpecificItem',
  CREATE_ITEM = 'createItem',
  ASSIGN_CODEGENERATOR_TO_ITEM = 'assignCodeGeneratorToItem',
  UPDATE_ITEM = 'updateItem',
  ASSIGN_ITEM_TO_ITEMFLEET = 'assignItemToItemFleet',
  DELETE_ITEM = 'deleteItem',

  // ItemBatch permissions
  GET_ALL_ITEMBATCHES = 'getAllItemBatches',
  GET_SPECIFIC_ITEMBATCH = 'getSpecificItemBatch',
  CREATE_ITEMBATCH = 'createItemBatch',
  UPDATE_ITEMBATCH = 'updateItemBatch',
  DELETE_ITEMBATCH = 'deleteItemBatch',

  // ItemFirmware permissions
  GET_ALL_ITEMFIRMWARES = 'getAllItemFirmwares',
  GET_SPECIFIC_ITEMFIRMWARE = 'getSpecificItemFirmware',
  CREATE_ITEMFIRMWARE = 'createItemFirmware',
  UPDATE_ITEMFIRMWARE = 'updateItemFirmware',
  DELETE_ITEMFIRMWARE = 'deleteItemFirmware',

  // ItemFleets permission
  GET_ALL_ITEMFLEETS = 'getAllItemFleets',
  GET_SPECIFIC_ITEMFLEET = 'getSpecificItemFleet',
  CREATE_ITEMFLEET = 'createItemFleet',
  UPDATE_ITEMFLEET = 'updateItemFleet',
  DELETE_ITEMFLEET = 'deleteItemFleet',

  //ItemSKUs permissions
  GET_ALL_ITEMSKUS = 'getAllItemSKUs',
  GET_SPECIFIC_ITEMSKU = 'getSpecificItemSKU',
  CREATE_ITEMSKU = 'createItemSKU',
  UPDATE_ITEMSKU = 'updateItemSKU',
  DELETE_ITEMSKU = 'deleteItemSKU',
  CREATE_ITEMSKUS_IN_BULK = 'createItemSKUsInBulk',

  //ItemStocks permissions
  GET_ALL_ITEMSTOCKS = 'getAllItemStocks',
  GET_SPECIFIC_ITEMSTOCK = 'getSpecificItemStock',
  CREATE_ITEMSTOCK = 'createItemStock',
  UPDATE_ITEMSTOCK = 'updateItemStock',
  DELETE_ITEMSTOCK = 'deleteItemStock',

  // Materials permssion
  GET_ALL_MATERIALS = 'getAllMaterials',
  GET_SPECIFIC_MATERIAL = 'getSpecificMaterial',
  CREATE_MATERIAL = 'createMaterial',
  UPDATE_MATERIAL = 'updateMaterial',
  DELETE_MATERIAL = 'deleteMaterial',

  // Media metas permissions
  GET_ALL_MEDIA_METAS = 'getAllMediaMetas',
  GET_SPECIFIC_MEDIA_META = 'getSpecificMediaMeta',
  CREATE_MEDIA_META = 'createMediaMeta',
  UPDATE_MEDIA_META = 'updateMediaMeta',
  DELETE_MEDIA_META = 'deleteMediaMeta',

  //Packs permissions
  GET_ALL_PACKS = 'getAllPacks',
  GET_SPECIFIC_PACK = 'getSpecificPack',
  CREATE_PACK = 'createPack',
  UPDATE_PACK = 'updatePack',
  DELETE_PACK = 'deletePack',

  // Parts permissions
  GET_ALL_PARTS = 'getAllParts',
  GET_SPECIFIC_PART = 'getSpecificPart',
  CREATE_PART = 'createPart',
  DELETE_PART = 'deletePart',
  UPDATE_PART = 'updatePart',

  // Place permissions
  GET_ALL_PLACES = 'getAllPlaces',
  GET_SPECIFIC_PLACE = 'getSpecificPlace',
  CREATE_PLACE = 'createPlace',
  UPDATE_PLACE = 'updatePlace',
  DELETE_PLACE = 'deletePlace',

  // Product permissions
  GET_ALL_PRODUCTS = 'getAllProducts',
  GET_SPECIFIC_PRODUCT = 'getSpecificProduct',
  CREATE_PRODUCT = 'createProduct',
  UPDATE_PRODUCT = 'updateProduct',
  DELETE_PRODUCT = 'deleteProduct',

  // Routes permission
  GET_ALL_ROUTES = 'getAllRoutes',
  GET_SPECIFIC_ROUTE = 'getSpecificRoute',
  CREATE_ROUTE = 'createRoute',
  UPDATE_ROUTE = 'updateRoute',
  DELETE_ROUTE = 'deleteRoute',

  //Shipment permission
  GET_ALL_SHIPMENT = 'getAllShipments',
  GET_SPECIFIC_SHIPMENT = 'getSpecificShipment',
  CREATE_SHIPMENT = 'createShipment',
  UPDATE_SHIPMENT = 'updateShipment',
  DELETE_SHIPMENT = 'deleteShipment',

  /*

        E-COMMERCE SERVICE PERMISSIONS

    */

  // Buyer permissions
  GET_SPECIFIC_BUYER = 'getSpecificBuyer',
  GET_ALL_BUYERS = 'getAllBuyers',
  DELETE_BUYER = 'deleteBuyer',
  UPDATE_BUYER = 'updateBuyer',
  UPDATE_BUYER_PASSWORD = 'updateBuyerPassword',

  //Brand permissions
  GET_SPECIFIC_BRAND = 'getSpecificBrand',
  GET_ALL_BRANDS = 'getAllBrands',
  DELETE_BRAND = 'deleteBrand',
  UPDATE_BRAND = 'updateBrand',
  CREATE_BRAND = 'createBrand',

  //Category permissions
  GET_SPECIFIC_CATEGORY = 'getSpecificCategory',
  GET_ALL_CATEGORIES = 'getAllCategories',
  DELETE_CATEGORY = 'deleteCategory',
  UPDATE_CATEGORY = 'updateCategory',
  CREATE_CATEGORY = 'createCategory',

  // AmazonProductCategories
  GET_ALL_AMAZON_PRODUCT_CATEGORIES = 'getAllAmazonProductCategories',
  GET_SPECIFIC_AMAZON_PRODUCT_CATEGORY = 'getSpecificAmazonProductCategory',
  CREATE_AMAZON_PRODUCT_CATEGORY = 'createAmazonProducCategory',
  UPDATE_AMAZON_PRODUCT_CATEGORY = 'updateAmazonProducCategory',
  DELETE_AMAZON_PRODUCT_CATEGORY = 'deleteAmazonProducCategory',

  // Application site permissions
  GET_SPECIFIC_APPLICATION_SITE = 'getSpecificApplicationSite',
  GET_ALL_APPLICATION_SITES = 'getAllApplicationSite',
  DELETE_APPLICATION_SITE = 'deleteApplicationSite',
  UPDATE_APPLICATION_SITE = 'updateApplicationSite',
  CREATE_APPLICATION_SITE = 'createApplicationSite',

  // Brand Selector permissions
  GET_SPECIFIC_BRAND_SELECTOR = 'getSpecificBrandSelector',
  GET_ALL_BRAND_SELECTOR_SELECTORS = 'getAllBrandSelectorSelectors',
  DELETE_BRAND_SELECTOR = 'deleteBrandSelector',
  UPDATE_BRAND_SELECTOR = 'updateBrandSelector',
  CREATE_BRAND_SELECTOR = 'createBrandSelector',

  // Brand permissions
  GET_SPECIFIC_CATEGORY_SELECTOR = 'getSpecificCategorySelector',
  GET_ALL_CATEGORY_SELECTOR_SELECTORS = 'getAllCategorySelectorSelectors',
  DELETE_CATEGORY_SELECTOR = 'deleteCategorySelector',
  UPDATE_CATEGORY_SELECTOR = 'updateCategorySelector',
  CREATE_CATEGORY_SELECTOR = 'createCategorySelector',

  // Product selector permissions
  GET_SPECIFIC_PRODUCT_SELECTOR = 'getSpecificProductSelector',
  GET_ALL_PRODUCT_SELECTOR_SELECTORS = 'getAllProductSelectorSelectors',
  DELETE_PRODUCT_SELECTOR = 'deleteProductSelector',
  UPDATE_PRODUCT_SELECTOR = 'updateProductSelector',
  CREATE_PRODUCT_SELECTOR = 'createProductSelector',

  //File resolver permissions
  UPLOAD_FILE = 'uploadFile',

  //Product Ecommerce permissions
  GET_SPECIFIC_ECOMMERCE_PRODUCT = 'getSpecificEcommerceProduct',
  GET_ALL_ECOMMERCE_PRODUCTS = 'getAllEcommerceProducts',
  DELETE_ECOMMERCE_PRODUCT = 'deleteEcommerceProduct',
  UPDATE_ECOMMERCE_PRODUCT = 'updateEcommerceProduct',
  CREATE_ECOMMERCE_PRODUCT = 'createEcommerceProduct',
  GET_ECOMMERCE_PRODUCTS_BY_CATEGORY = 'getEcommerceProductsByCategory',

  // Variation permissions
  GET_SPECIFIC_VARIATION = 'getSpecificVariation',
  GET_ALL_VARIATIONS = 'getAllVariations',
  DELETE_VARIATION = 'deleteVariation',
  UPDATE_VARIATION = 'updateVariation',
  CREATE_VARIATION = 'createVariation',

  /*

       CLIENT  SERVICE PERMISSIONS

    */

  // agent user permissions
  GET_SPECIFIC_AGENT = 'getSpecificAgent',
  GET_ALL_AGENTS = 'getAllAgents',
  GET_ALL_AGENTS_FOR_DISTRIBUTOR = 'getAllAgentsForDistributor',
  ADMIN_GET_ALL_AGENTS_FOR_DISTRIBUTOR = 'adminGetAllAgentsForDistributor',
  DELETE_AGENT = 'deleteAgent',
  CHANGE_AGENT_SUB_ROLE = 'changeAgentSubRole',
  UPDATE_AGENT = 'updateAgent',
  UPDATE_AGENT_PASSWORD = 'updateAgentPassword',

  // distributor user permissions
  GET_SPECIFIC_DISTRIBUTOR = 'getSpecificDistributor',
  GET_ALL_DISTRIBUTORS = 'getAllDistributors',
  DELETE_DISTRIBUTOR = 'deleteDistributor',
  GENERATE_AGENT_SIGNUP_TOKEN = 'generateAgentSignUpToken',
  UPDATE_DISTRIBUTOR = 'updateDistributor',
  UPDATE_DISTRIBUTOR_PASSWORD = 'updateDistributorPassword',
  ADMIN_REGISTER_DISTRIBUTOR = 'adminRegisterDistributor',

  // Organization Permissions
  GET_ALL_ORGANIZATIONS = 'getAllOrganizations',
  GET_SPECIFIC_ORGANIZATION = 'getSpecificOrganization',
  CREATE_ORGANIZATION = 'createOrganization',
  UPDATE_ORGANIZATION = 'updateOrganization',
  DELETE_ORGANIZATION = 'deleteOrganization',

  // Servicer Permissions
  GET_ALL_SERVICERS = 'getAllServicers',
  GET_SPECIFIC_SERVICER = 'getSpecificServicer',
  CREATE_SERVICER = 'createServicer',
  UPDATE_SERVICER = 'updateServicer',
  DELETE_SERVICER = 'deleteServicer',

  //Suppliers permissions
  GET_ALL_SUPPLIERS = 'getAllSuppliers',
  GET_SPECIFIC_SUPPLIER = 'getSpecificSupplier',
  CREATE_SUPPLIER = 'createSupplier',
  UPDATE_SUPPLIER = 'updateSupplier',
  DELETE_SUPPLIER = 'deleteSupplier',

  /*

       EVENT  SERVICE PERMISSIONS

    */

  // Message permissions
  GET_ALL_MESSAGES = 'getAllMessages',
  GET_SPECIFIC_MESSAGE = 'getSpecificMessage',
  CREATE_MESSAGE = 'createMessage',
  DELETE_MESSAGE = 'deleteMessage',
  UPDATE_MESSAGE = 'updateMessage',
}

registerEnumType(PERMISSIONS, {
  name: 'PermissionInput',
});
