import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TdFileSelectComponent } from './file-select.component';
import { By } from '@angular/platform-browser';
import { MatButtonModule, MatIconModule, MatButtonToggleModule, MatMenuModule, MatListModule } from '@angular/material';

describe('Component: App', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TdFileSelectComponent,
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
        MatMenuModule,
        MatListModule,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should get local files from OS and amount of them should be greater than 0',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.componentInstance.files.length).toBeGreaterThan(0);
      });
  })));

  it('should nextPage of localfiles and amount of them should be greater than 0',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      component.pathFuture.push(component.homeDir);
      component.prevPath = component.homeDir;
      component.nextPage();
      fixture.whenStable().then(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(fixture.componentInstance.files.length).toBeGreaterThan(0);
        });
      });
  })));

  it('should not be able to Show Previous Button',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      component.pathHistory = [];
      fixture.whenStable().then(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(component.canShowPrevious()).toBeFalsy();
        });
      });
  })));

  it('should be able to Show Previous Button',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      component.pathHistory.push(component.homeDir);
      fixture.whenStable().then(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(component.canShowPrevious()).toBeTruthy();
        });
      });
  })));

  it('should not be able to Show Next Button',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      component.pathFuture = [];
      fixture.whenStable().then(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(component.canShowNext()).toBeFalsy();
        });
      });
  })));

  it('should be able to Show Next Button',
    async(inject([], () => {
      let fixture: ComponentFixture<any> = TestBed.createComponent(TdFileSelectComponent);
      let component: TdFileSelectComponent = fixture.debugElement.componentInstance;
      component.ngAfterViewInit();
      fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      component.pathFuture.push(component.homeDir);
      fixture.whenStable().then(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(component.canShowNext()).toBeTruthy();
        });
      });
  })));

});
