# food-shop-backend

before running the project:
1. You should go to: node_module/@types/express/index.d.ts and push this data: 

declare global {
    namespace Express {
      interface Request {
        access: any
      }
    }
}