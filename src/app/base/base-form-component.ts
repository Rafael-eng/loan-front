import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseDTO} from './dto/base-dto';
import {BaseService} from './service/base-service';
import {UsersService} from '../service/user.service';
import {lastValueFrom} from 'rxjs';
import {ModalReference} from '@developer-partners/ngx-modal-dialog';
import {UserDTO} from '../dto/user-dto';
import Swal from 'sweetalert2';

@Component({
  template: `
  `,
  standalone: true,
  selector: 'app-base-form'

})
export class BaseFormComponent<T extends BaseDTO> implements OnInit {
  @Input() initialData: T | undefined;
  form!: FormGroup;
  $service: BaseService<T>;

  constructor(
    private fb: FormBuilder,
    private service: BaseService<T>,
    private readonly modalReference: ModalReference<T>,
  ) {
    this.$service = service;
    if (modalReference.config.model) {
      this.initialData = modalReference.config.model
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  protected createForm(): void {
    this.form = this.fb.group({
      id: [this.initialData?.id, ],
    });
  }

  protected validateForm(): boolean {
    return this.form.valid;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      this.persist();
    } else {
      console.log('Formulário inválido');
    }
  }


  protected persist = async (): Promise<void> => {
    // Exibe o SweetAlert para confirmação antes de persistir
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, salvar!',
      cancelButtonText: 'Cancelar',
    });

    // Se o usuário confirmar, executa a persistência
    if (result.isConfirmed) {
      try {
        const response = await lastValueFrom(this.$service.persist(this.form.value));

        // Fechar o modal de sucesso após a persistência
        this.modalReference.closeSuccess();

        // Exibe um alerta de sucesso após salvar os dados
        Swal.fire({
          title: 'Sucesso!',
          text: 'Os dados foram salvos com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

      } catch (error) {
        // Em caso de erro, exibe um alerta de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao tentar salvar os dados.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });

        console.error('Erro ao salvar:', error);
      }
    } else {
      // Se o usuário cancelar a operação, não faz nada
      console.log('Ação cancelada');
    }
  };
  protected beforePersist(callback: any, payload?: any): void {
    callback(payload);
  }

  cancel(): void {
    this.modalReference.cancel();
  }

}
