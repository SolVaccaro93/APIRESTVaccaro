import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://62b114b9e460b79df0517198.mockapi.io/rest/estudiante';

  studentToEdit!: Student | null;

  constructor(
    private http: HttpClient
  ) {}

  private handleError(error: HttpErrorResponse) {
    //Manejo de errores http frontend
    if(error) {
      console.warn(`Error de backend: ${error.status}, cuerpo del error: ${error.message}`);
    }
    return throwError('Error de comunicación Http');
  }

  getStudents():Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
    .pipe(catchError(this.handleError));
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + id)
    .pipe(catchError(this.handleError));
  }

  deleteStudentById(id: number): Observable<Student> {
    return this.http.delete<Student>(this.apiUrl + id)
    .pipe(catchError(this.handleError));
  }

  editStudentById(id:number, student: Student): Observable<Student> {
    return this.http.put<Student>(this.apiUrl + id, student)
    .pipe(catchError(this.handleError));
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student)
    .pipe(catchError(this.handleError));
  }

  getStudentToEdit():Observable<Student | null> {
    return of(this.studentToEdit);
  }

  setStudentToEdit(student: Student | null) {
    return new Promise((resolve, reject) => {
      if(student || student === null) {
        this.studentToEdit = student;
        return resolve(true)
      }else {
        return reject({ message: 'No se pudo setear el studentToEdit' })
      }
    });
  }
}

