import { BadRequestException } from "@nestjs/common";
import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Matches, MaxLength, MinLength, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ async: false })
export class PasswordsMatch implements ValidatorConstraintInterface {
  validate(confirmPassword: any, args: ValidationArguments) {
    const { password } = args.object as any;
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    return true;
  }
}

export class CreateUserDto {
  /**
   * Esta es la propiedad name
   * @example Fulanito
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Esta es la propiedad email
   * @example fulanito@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Esta es la propiedad password
   * @example aaAA11!!
   */
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @IsString()
  @MaxLength(120)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y símbolos !@#$%^&*',
    },
  ) // como responde al cliente sin personalizar las opciones? =  "La contraseña no es lo suficientemente segura"
  password: string;

  /**
   * Esta es la propiedad confirmPassword
   * @example aaAA11!!
   */
  @IsNotEmpty()
  @IsString()
  @Validate(PasswordsMatch)
  confirmPassword: string;

  /**
   * Esta es la propiedad address
   * @example calle falsa 1234
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Esta es la propiedad phone
   * @example 3518880000
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Esta es la propiedad country
   * @example Argentina
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Esta es la propiedad city
   * @example Córdoba
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * Esta es la propiedad isAdmin
   * @example user
   */
  @ApiHideProperty()
  @IsEmpty()
  @IsOptional()
  isAdmin?: boolean;
}

  // @Matches(/^(?=(.*[a-z]){1,})/, {
  //   message: 'La contraseña debe tener al menos 1 letra minúscula',
  // })
  // @Matches(/^(?=.*[A-Z])/, {
  //   message: 'La contraseña debe tener al menos 1 letra mayúscula',
  // })
  // @Matches(/^(?=.*\d)/, {
  //   message: 'La contraseña debe tener al menos 1 número',
  // })
  // @Matches(/^(?=.*[!@#$%^&*])/, {
  //   message: 'La contraseña debe tener al menos 1 carácter: !@#$%^&*',
  // })