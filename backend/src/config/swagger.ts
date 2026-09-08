import swaggerJSDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "API do sistema de ecommerce"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ],
        tags: [
            {
                name: "Authentication",
                description: "Autenticação e gerenciamento de tokens"
            },
            {
                name: "Users"
            },
            {
                name: "Categories"
            },
            {
                name: "Products"
            },
            {
                name: "Stock Movements"
            },
            {
                name: "Orders"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

              schemas: {
                CreateUser: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "João Silva"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "ADMIN",
                                "MANAGER",
                                "CUSTOMER"
                            ],
                            example: "CUSTOMER"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },
                CreateManager: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "João Silva"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com"
                        },
                        role: {
                            type: "string",
                            enum: [
                                "ADMIN",
                                "MANAGER",
                                "CUSTOMER"
                            ],
                            example: "MANAGER"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "Mouse Gamer"
                        },
                        description: {
                            type: "string",
                            example: "Mouse gamer RGB"
                        },
                        price: {
                            type: "number",
                            format: "float",
                            example: 149.90
                        },
                        quantity: {
                            type: "integer",
                            example: 20
                        },
                        categoryId: {
                            type: "integer",
                            example: 1
                        }
                    }
                },

                Category: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "Periféricos"
                        }
                    }
                },

                StockMovement: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        productId: {
                            type: "integer",
                            example: 1
                        },
                        quantity: {
                            type: "integer",
                            example: 5
                        },
                        type: {
                            type: "string",
                            enum: [
                                "IN",
                                "OUT"
                            ],
                            example: "IN"
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                OrderItem: {
                    type: "object",
                    properties: {
                        productId: {
                            type: "integer",
                            example: 1
                        },
                        quantity: {
                            type: "integer",
                            example: 2
                        }
                    },
                    required: [
                        "productId",
                        "quantity"
                    ]
                },

                Order: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        userId: {
                            type: "integer",
                            example: 1
                        },
                        total: {
                            type: "number",
                            format: "float",
                            example: 299.80
                        },
                        status: {
                            type: "string",
                            enum: [
                                "PENDING",
                                "PAID",
                                "DELIVERED",
                                "CANCELLED"
                            ],
                            example: "PENDING"
                        }
                    }
                },

                Login: {
                    type: "object",
                    required: [
                        "email",
                        "password"
                    ],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "joao@email.com"
                        },
                        password: {
                            type: "string",
                            example: "123456"
                        }
                    }
                },

                LoginResponse: {
                    type: "object",
                    properties: {
                        accessToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIs..."
                        }
                    }
                }
            }
        }
    },

    apis: ["src/routes/*.ts"]
}

export default swaggerJSDoc(options)          