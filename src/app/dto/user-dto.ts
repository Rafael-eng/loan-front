import {BaseDTO} from '../base';

export class UserDTO extends BaseDTO{
  name?: string;
  email?: string;
  registrationDate?: Date;
  phone?: String;

  constructor(model?: UserDTO) {
    super(model);

    if (model) {
      this.name = model.name;
      this.email = model.email;
      this.phone = model.phone;
      this.registrationDate = model.registrationDate;
    }
  }

  static override setPayload(json: any): UserDTO {
    const dto = new UserDTO();
    dto.id = json.id;
    dto.email = json.email;
    dto.phone = json.phone;
    dto.registrationDate = json.registrationDate;
    dto.name = json.name;
    return dto;
  }

  public override getPayload() {
    const payload = {
      id: this.id,
      email: this.email,
      phone: this.phone,
      registrationDate: this.registrationDate,
      name: this.name
    };

    return payload;
  }
}
