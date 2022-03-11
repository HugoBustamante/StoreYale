import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Importamos los componentes de las paginas:
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';

//Habilitamos las reglas para las rutas:
const routes: Routes = [
      {
        path: '',//Cuando tengamos una ruta vacio
        component: LayoutComponent, //Nuestra ruta inicial será el Layout
        children: [ //El componente LayoutComponent va a tener hijos
            {
              path: '',//Cuando tengamos la ruta en vacio
              redirectTo: 'grid',//Nos redireccionamos a la ruta grid.
              pathMatch: 'full'
            },
            {
              path: 'grid',//Creamos la ruta grid
              component: GridComponent//Que renderizará esté componente
            },
            {
              path: 'tasks',//Creamos la ruta tasks
              component: TasksComponent//Que renderizará este componente
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
