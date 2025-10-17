package com.internship.project.entity;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter
@Setter
@Table(name = "users")
@AllArgsConstructor

@RequiredArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String companyName;
    @NotNull
    private String email;
    @NotNull
    private String password;
    private String role;
    private String contactNumber;
    private String warehouseLocation;


}
