import { Routes } from '@angular/router';
import { UpdateAssetComponent } from './layout/update-asset/update-asset.component';
import { AssetListComponent } from './layout/asset-list/asset-list.component';
import { AddAssetComponent } from './layout/add-asset/add-asset.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';

import { AssetcardComponent } from './layout/assetcard/assetcard.component';
import { TempComponent } from './layout/temp/temp.component';
import { authGuard } from './shared/Guards/auth.guard';
import { EmployeeListComponent } from './layout/employee-list/employee-list.component';
export const routes: Routes = [

    // { path: "", component: AppComponent },
    { path: '', redirectTo: '/assetCard', pathMatch: 'full' },
    { path: "addAsset", component: AddAssetComponent, canActivate:[authGuard]},
    { path: "assetlist/:Action", component: AssetListComponent,canActivate:[authGuard] },
    { path: "update", component: UpdateAssetComponent,canActivate:[authGuard] },
    { path: "login", component: LoginComponent },
     {path:"register",component:RegisterComponent},
     {path:'assetCard',component:AssetcardComponent,canActivate:[authGuard]},
    {path:'employeeList/:EmployeeId', component:EmployeeListComponent},

    {path:'temp',component:TempComponent}
];
