package ca.gb.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import ca.gb.example.models.SampleEntity;
import ca.gb.example.services.SampleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api", produces = { MediaType.APPLICATION_JSON_VALUE })
public class SampleController {

	@Autowired
	SampleService sampleService;
	
	@GetMapping(value="/samples")
    public List<SampleEntity> listSampleEntities(){
        return sampleService.findAll();
    }
	
	@PostMapping(value="/samples")
    public SampleEntity createOrSaveSample(@RequestBody SampleEntity sampleEntity){
		return sampleService.save(sampleEntity);
    }
	
	@GetMapping(value="/samples/{id}")
	public ResponseEntity<SampleEntity> getSampleEntity(@PathVariable Long id) {
		SampleEntity sampleEntity = sampleService.findById(id);
		return new ResponseEntity<SampleEntity>(sampleEntity, new HttpHeaders(), HttpStatus.OK);
		// return sampleService.findById(id);
	}
	
	@GetMapping(value="/sample/page")
	public ResponseEntity<Page<SampleEntity>> getAsPage(
			@RequestParam(required = false, defaultValue = "") String filter,
            @RequestParam(defaultValue = "0") Integer pageIndex, 
            @RequestParam(defaultValue = "10") Integer size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(required = false, defaultValue = "asc") String sortOrder) 
	{
		Page<SampleEntity> page = sampleService.page(filter, pageIndex, size, sort, sortOrder);
		return new ResponseEntity<Page<SampleEntity>>(page, new HttpHeaders(), HttpStatus.OK);
	}
	
	
}
