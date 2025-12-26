package org.example.QuanLyMuaVu.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.QuanLyMuaVu.DTO.Request.VarietyRequest;
import org.example.QuanLyMuaVu.DTO.Response.VarietyResponse;
import org.example.QuanLyMuaVu.Entity.Crop;
import org.example.QuanLyMuaVu.Entity.Variety;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Mapper.VarietyMapper;
import org.example.QuanLyMuaVu.Repository.CropRepository;
import org.example.QuanLyMuaVu.Repository.VarietyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class VarietyService {

    VarietyRepository varietyRepository;
    CropRepository cropRepository;
    VarietyMapper varietyMapper;

    public VarietyResponse create(VarietyRequest request) {
        Crop crop = cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new AppException(ErrorCode.CROP_NOT_FOUND));

        Variety variety = varietyMapper.toEntity(request, crop);
        Variety saved = varietyRepository.save(variety);
        return varietyMapper.toResponse(saved);
    }

    public VarietyResponse update(Integer id, VarietyRequest request) {
        Variety variety = varietyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));

        Crop crop = cropRepository.findById(request.getCropId())
                .orElseThrow(() -> new AppException(ErrorCode.CROP_NOT_FOUND));

        varietyMapper.update(variety, request, crop);
        Variety saved = varietyRepository.save(variety);
        return varietyMapper.toResponse(saved);
    }

    public void delete(Integer id) {
        varietyRepository.deleteById(id);
    }

    public VarietyResponse get(Integer id) {
        Variety variety = varietyRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        return varietyMapper.toResponse(variety);
    }

    public List<VarietyResponse> listByCrop(Integer cropId) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new AppException(ErrorCode.CROP_NOT_FOUND));
        return varietyRepository.findAllByCrop(crop)
                .stream()
                .map(varietyMapper::toResponse)
                .toList();
    }
}

