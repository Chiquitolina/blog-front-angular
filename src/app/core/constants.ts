    export enum NavbarItems {
        Angular = 'Angular',
        EstructurasyAlgoritmos = 'Estructuras de datos y algoritmos',
        PatronesDeDiseño = 'Patrones de diseño',
    }

    export enum AngularSubcategories {
        Components = 'Componentes',
        Services = 'Servicios',
        Directives = 'Directivas',
        Forms = 'Formularios',
        RxJS = 'RxJS',
        Optimización = 'Optimización y Performance',
        DeepInsights = 'Deep Insights',
        Subcategoria = 'Subcategoria'
    }
    
    export enum EstructurasyAlgoritmosSubcategories {
        Sorting = 'Algoritmos de ordenamiento',
        Searching = 'Algoritmos de búsqueda',
        DataStructures = 'Estructuras de datos',
    }
    
    export enum PatronesDeDiseñoSubcategories {
        Creational = 'Patrones creacionales',
        Structural = 'Patrones estructurales',
        Behavioral = 'Patrones de comportamiento',
    }

    export const SubcategoriesMap: Record<NavbarItems, string[]> = {
        [NavbarItems.Angular]: Object.values(AngularSubcategories),
        [NavbarItems.EstructurasyAlgoritmos]: Object.values(EstructurasyAlgoritmosSubcategories),
        [NavbarItems.PatronesDeDiseño]: Object.values(PatronesDeDiseñoSubcategories),
    };