# Angular Project Scaffold 
This project serves as a scaffold base for building new Angular projects. Features included are:

* Bootstrap Toolkit
* Dynamic Theme selection
* Browser Animation support
* Standardized project layout
* Module-based components
* App Configuration JSON Settings

## Project Layout
Follows guidelines presented in the <a href="https://angular-folder-structure.readthedocs.io/en/latest/overview.html" target="_blank">Angular Folder Structure</a>.

### App Directory 
#### Core
- Contains fundamental application provisions, including route guards, HTTP interceptors, logging, etc.

#### Data
- Provides services and state objects for various data sources used in the project.

#### Shared
- Provides ready access to all models, components, and styling for use in other files.

#### Modules
- Contains all other components needed for the application, including page layouts, charts, tables, etc.

### Assets Directory
Contains needed images and resources used in the application.

### Configurations Directory
#### Configurations
- Contains application settings in JSON files which can be accessed anywhere in the application.

#### Environments
- Allows switching between development and production modes.

#### Proxies
- Defines needed proxy addressing for application routing.

### Styles Directory
Provides styling for the whole project and for localized components. Also includes themes and other customization.

### Documentation Directory
Includes all relevant documentation for the project, requirements, etc.