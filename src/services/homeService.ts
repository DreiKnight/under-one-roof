import type { EmergencyContact, HomeProfile } from "@/types";
import {
  homeProfile,
  allProperties,
  emergencyContacts,
  emergencyContactsByProperty,
} from "@/data/home";

// Phase 2: replace bodies with Supabase queries scoped to the current user.

export function getHomeProfile(): HomeProfile {
  return homeProfile;
}

export function getAllProperties(): HomeProfile[] {
  return allProperties;
}

export function getEmergencyContacts(propertyId?: string): EmergencyContact[] {
  if (propertyId && emergencyContactsByProperty[propertyId]) {
    return emergencyContactsByProperty[propertyId];
  }
  return emergencyContacts;
}
