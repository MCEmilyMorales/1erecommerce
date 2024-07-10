import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { ApiHideProperty, PickType } from '@nestjs/swagger';

@ValidatorConstraint({ async: false })
export class PasswordsMatch implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const { password } = args.object as any;
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }
    return true;
  }
}

export class CreateUserDto {
  /**
   * Propiedad: Nombre de usuario
   * @example prueba
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Propiedad: Email de usuario
   * @example example@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Propiedad: Password de usuario debe contener al menos 8 caracteres, incluyendo minúsculas, mayúsculas, números y símbolos !@#$%^&*
   * @example prueba0!
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
   * Propiedad: confirmPassword debe ser la misma que el password del usuario
   * @example Prueba0!
   */
  @IsNotEmpty()
  @IsString()
  @Validate(PasswordsMatch) 
  confirmPassword: string;

  /**
   * Propiedad: address debe ser una direccion
   * @example calle falsa 1234
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Propiedad: phone debe ser un número de telefono
   * @example 3518880000
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Propiedad: country debe ser un pais
   * @example Argentina
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Propiedad: city debe ser una ciudad
   * @example Córdoba
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * Propiedad: isAdmin, por defecto debe ser un usuario
   * @example user
   */
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'address',
  'phone',
  'city',
  'country',
]) {}
