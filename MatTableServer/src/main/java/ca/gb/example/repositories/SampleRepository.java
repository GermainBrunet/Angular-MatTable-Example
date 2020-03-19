package ca.gb.example.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ca.gb.example.models.SampleEntity;


@Repository
public interface SampleRepository extends JpaRepository<SampleEntity, Long> {
	
	SampleEntity findByName(String name);
	
	SampleEntity findByValue(String value);
	
	Page<SampleEntity> findAll(Pageable pageable);

	@Query("SELECT s FROM SampleEntity s WHERE s.name LIKE CONCAT('%',:filter,'%') OR s.value LIKE CONCAT('%',:filter,'%')") 
    Page<SampleEntity> findByFilter(@Param("filter") String filter, Pageable pageable);
}
