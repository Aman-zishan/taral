import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from '@modules/multipart';

export class UpdateEntityDto {
  @ApiProperty({ example: 'Engelbrecht Ltd' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'John Smith' })
  @IsString()
  @IsOptional()
  beneficialOwner?: string;

  @ApiProperty({ example: '55-NB' })
  @IsString()
  @IsOptional()
  abbreviation?: string;

  @ApiProperty({ example: 'German' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ example: 'Berlin' })
  @IsString()
  @IsOptional()
  headquaters?: string;

  @ApiProperty({ example: 'Information Technology' })
  @IsString()
  @IsOptional()
  industryType?: string;

  @ApiProperty({ example: 'Software Development' })
  @IsString()
  @IsOptional()
  coreBusiness?: string;

  @ApiProperty({ example: '12-12-2022' })
  @IsDateString()
  @IsOptional()
  incorporationDate?: Date;

  @ApiProperty({ example: 'Limited' })
  @IsString()
  @IsOptional()
  legalForm?: string;
}
