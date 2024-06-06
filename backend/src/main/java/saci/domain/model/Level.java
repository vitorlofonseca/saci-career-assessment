package saci.domain.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "levels")
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "min_coefficient")
    private int minCoefficient;

    @Column(name = "max_coefficient")
    private int maxCoefficient;

    @Column(name = "link")
    private String link;
}
