package ca.gb.example.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import ca.gb.example.models.SampleEntity;
import ca.gb.example.repositories.SampleRepository;

@Component
public class SampleService implements CommonServiceInterface<SampleEntity> {

	@Autowired
	SampleRepository sampleRepository;
	
	@Override
	public long count() {
		return sampleRepository.count();
	}

	@Override
	public SampleEntity find(String s) {
		return sampleRepository.findByName(s);
	}

	@Override
	public SampleEntity findById(Long id) {
		Optional<SampleEntity> optional = sampleRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public List<SampleEntity> findAll() {
		return sampleRepository.findAll();
	}

	@Override
	public Page<SampleEntity> page(String filter, Integer pageIndex, Integer pageSize, String sortBy, String sortOrder) {
		
		System.out.println("sortBy: " + sortBy);
		System.out.println("pageIndex: " + pageIndex);
		
		Direction direction = Direction.ASC;
		if (sortOrder.equals("desc")) {
			direction = Direction.DESC;
		}
		
		Pageable paging = PageRequest.of(pageIndex, pageSize, Sort.by(direction, sortBy));

		Page <SampleEntity> page = null;
		if (StringUtils.isEmpty(filter)) {
			page = sampleRepository.findAll(paging); 
		} else {
			page = sampleRepository.findByFilter(filter, paging);
		}
		
		return page;
		
	}

	@Override
	public SampleEntity save(SampleEntity t) {
		sampleRepository.save(t);
		return t;
	}

	@Override
	public void deleteAll() {
		sampleRepository.deleteAll();
	}

	@Override
	public void deleteById(Long id) {
		sampleRepository.deleteById(id);
	}
	
}
