# Folder Structure Overview

1. **app:**\
   Inside app folder, folder only pertaining to the business logic or route paths are present.
2. **components:**\
   Inside components folder, all the components big or small, are present that are used to build the different sections of the app.
3. **ui:**\
   Inside ui folder, all the block level components from [shadcn](https://ui.shadcn.com/),and fonts.ts are present.
4. **lib:**\
   Inside lib folder, all the utility functions, actions and data functions is placed.

# Custom Settings Overview

- ### **Shadcn configurations are in [components.json](components.json)**
- ### **CSS configurations are in [tailwind.config.ts](tailwind.config.ts) and [globals.css](globals.css)**
- ### **Initial redirection to dashboard page is setup in [next-config.js](next.config.js)**

```
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashbaord",
        permanent: false,
      },
    ];
  },
```

> It is currently commented off as it creates an annoying problem.
> Problem: Once it is invoked, it caches the redirection path and keeps redirecting to the same path even if the function is modified or removed.
> Solution: Switch on disable cache in developer tools network tab.
